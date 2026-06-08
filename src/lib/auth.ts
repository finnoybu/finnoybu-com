// Better Auth configuration for finnoybu.com — the *central* auth host for
// the Finnoybu family of sites.
//
// Auth model (matches the prior Supabase + fiction/memoirs setup):
//   - Email + password (primary)
//   - Google / Facebook / Apple / GitHub OAuth (enabled when client IDs+secrets are set)
//   - Magic-link as the password-reset path
//   - Cross-subdomain cookies on `.finnoybu.com` so sessions span finnoybu.com
//     + fiction.finnoybu.com + memoirs.finnoybu.com (one shared D1 binding,
//     one shared BETTER_AUTH_SECRET)
//   - Verification + reset emails via AWS SES (SigV4 via aws4fetch)
//
// This module is server-only. Never import from a client-side script.

import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { magicLink } from 'better-auth/plugins';
import { drizzle } from 'drizzle-orm/d1';
import { AwsClient } from 'aws4fetch';
import * as schema from '~/db/schema';
import { hashPassword, verifyPassword } from '~/lib/password';

interface AuthInitOptions {
  d1: D1Database;
  baseUrl: string;
  authSecret: string;
  cookieDomain?: string;
  google?: { clientId: string; clientSecret: string };
  facebook?: { clientId: string; clientSecret: string };
  apple?: { clientId: string; clientSecret: string };
  github?: { clientId: string; clientSecret: string };
  awsAccessKeyId?: string;
  awsSecretAccessKey?: string;
  awsRegion?: string;
  fromAddress?: string;
}

export function createAuth({
  d1,
  baseUrl,
  authSecret,
  cookieDomain,
  google,
  facebook,
  apple,
  github,
  awsAccessKeyId,
  awsSecretAccessKey,
  awsRegion = 'us-east-1',
  fromAddress = 'Finnoybu.com <hello@finnoybu.com>',
}: AuthInitOptions) {
  const db = drizzle(d1, { schema });

  const socialProviders: Record<string, { clientId: string; clientSecret: string }> = {};
  if (google?.clientId && google?.clientSecret) socialProviders.google = google;
  if (facebook?.clientId && facebook?.clientSecret) socialProviders.facebook = facebook;
  if (apple?.clientId && apple?.clientSecret) socialProviders.apple = apple;
  if (github?.clientId && github?.clientSecret) socialProviders.github = github;

  async function sendSesEmail({ to, subject, text, html }: {
    to: string;
    subject: string;
    text: string;
    html: string;
  }) {
    if (!awsAccessKeyId || !awsSecretAccessKey) {
      console.warn(`[auth] AWS SES not configured. Email to ${to} (${subject}) dropped.`);
      return;
    }
    const aws = new AwsClient({
      accessKeyId: awsAccessKeyId,
      secretAccessKey: awsSecretAccessKey,
      service: 'ses',
      region: awsRegion,
    });
    const endpoint = `https://email.${awsRegion}.amazonaws.com/v2/email/outbound-emails`;
    const body = {
      FromEmailAddress: fromAddress,
      Destination: { ToAddresses: [to] },
      Content: {
        Simple: {
          Subject: { Data: subject, Charset: 'UTF-8' },
          Body: {
            Text: { Data: text, Charset: 'UTF-8' },
            Html: { Data: html, Charset: 'UTF-8' },
          },
        },
      },
    };
    const res = await aws.fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const errBody = await res.text();
      console.error(`[auth] SES sendEmail failed (${res.status}): ${errBody}`);
      throw new Error(`SES sendEmail failed: ${res.status}`);
    }
  }

  return betterAuth({
    baseURL: baseUrl,
    secret: authSecret,
    // The central auth host trusts itself, its Pages preview hostname, and
    // both reading-site subdomains (which redirect to finnoybu.com for the
    // OAuth dance and read the resulting `.finnoybu.com` cookie). Apple
    // posts the OAuth result with Origin: appleid.apple.com — Better Auth's
    // CSRF guard otherwise rejects it as a cross-site form submission.
    trustedOrigins: [
      baseUrl,
      'https://finnoybu.com',
      'https://finnoybu-com.pages.dev',
      'https://fiction.finnoybu.com',
      'https://memoirs.finnoybu.com',
      'https://appleid.apple.com',
    ],
    // Match the prior Supabase behaviour: a single email can sign in via
    // any configured provider. All four providers verify the email before
    // issuing tokens, so we treat them as trusted for auto-linking.
    account: {
      accountLinking: {
        enabled: true,
        trustedProviders: ['google', 'facebook', 'github', 'apple'],
      },
    },
    // Account settings (change email + delete) used by the reading sites'
    // /account page; the central auth host owns the underlying flows.
    user: {
      changeEmail: {
        enabled: true,
        sendChangeEmailVerification: async ({ newEmail, url }: { newEmail: string; url: string }) => {
          await sendSesEmail({
            to: newEmail,
            subject: 'Confirm your new Finnoybu email',
            text: changeEmailPlainText(url),
            html: changeEmailHtml(url),
          });
        },
      },
      deleteUser: {
        // FK cascades on D1 do the data cleanup automatically — see
        // finnoybu-trilogy schema (reading_progress / bookmarks /
        // annotations / errata_reports / purchases all reference user.id
        // with onDelete: 'cascade').
        enabled: true,
      },
    },
    database: drizzleAdapter(db, {
      provider: 'sqlite',
      schema: {
        user: schema.user,
        session: schema.session,
        account: schema.account,
        verification: schema.verification,
      },
    }),
    emailAndPassword: {
      enabled: true,
      // Sign-in is gated until the user clicks the verification link in
      // their inbox — matches the prior Supabase behaviour.
      requireEmailVerification: true,
      // Override Better Auth's default scrypt with PBKDF2 via Web Crypto.
      // Default scrypt blows past Workers free-tier 10ms CPU; PBKDF2-SHA256
      // at 100k iterations fits the budget. See ~/lib/password for tuning.
      password: {
        hash: hashPassword,
        verify: verifyPassword,
      },
      sendResetPassword: async ({ user, url }) => {
        await sendSesEmail({
          to: user.email,
          subject: 'Reset your Finnoybu password',
          text: resetPlainText(url),
          html: resetHtml(url),
        });
      },
    },
    emailVerification: {
      // Trigger the verification email automatically when an account is
      // created. Without this the user lands on "Check your email" but
      // nothing actually gets sent.
      sendOnSignUp: true,
      sendVerificationEmail: async ({ user, url }) => {
        await sendSesEmail({
          to: user.email,
          subject: 'Verify your Finnoybu email',
          text: verifyPlainText(url),
          html: verifyHtml(url),
        });
      },
    },
    socialProviders,
    plugins: [
      magicLink({
        expiresIn: 60 * 60,
        sendMagicLink: async ({ email, url }) => {
          await sendSesEmail({
            to: email,
            subject: 'Sign in to Finnoybu',
            text: magicPlainText(url),
            html: magicHtml(url),
          });
        },
      }),
    ],
    advanced: {
      // Workers doesn't expose a client IP to Better Auth by default, so its
      // rate limiting silently no-ops ("could not determine client IP").
      // Cloudflare always forwards the real IP in cf-connecting-ip.
      ipAddress: {
        ipAddressHeaders: ['cf-connecting-ip'],
      },
      ...(cookieDomain
        ? {
            defaultCookieAttributes: {
              domain: cookieDomain,
              sameSite: 'lax' as const,
              secure: true,
            },
            // Apple's Sign In uses response_mode=form_post — Apple POSTs back
            // from appleid.apple.com cross-site to our callback. SameSite=Lax
            // strips the state cookie on that POST, which makes Better Auth's
            // CSRF middleware reject the request as a cross-site form
            // submission. SameSite=None lets the state cookie survive; the
            // actual CSRF protection comes from the random state value being
            // compared against the cookie's encrypted contents, not from
            // SameSite. Session cookie stays SameSite=Lax (the default).
            cookies: {
              state: {
                attributes: {
                  sameSite: 'none' as const,
                },
              },
            },
          }
        : {}),
    },
  });
}

export type Auth = ReturnType<typeof createAuth>;

// =============================================================================
// Email templates
// =============================================================================

function magicPlainText(url: string): string {
  return [
    "Sign in to Finnoybu.",
    '',
    'Click within 60 minutes:',
    '',
    url,
    '',
    "If you didn't request this, ignore this email.",
    '',
    '— Finnoybu',
    'https://finnoybu.com',
  ].join('\n');
}

function resetPlainText(url: string): string {
  return [
    'Reset your Finnoybu password.',
    '',
    'Click within 60 minutes:',
    '',
    url,
    '',
    "If you didn't request a reset, ignore this email — your password is unchanged.",
    '',
    '— Finnoybu',
    'https://finnoybu.com',
  ].join('\n');
}

function verifyPlainText(url: string): string {
  return [
    'Verify your Finnoybu email.',
    '',
    'Click to confirm:',
    '',
    url,
    '',
    '— Finnoybu',
    'https://finnoybu.com',
  ].join('\n');
}

function changeEmailPlainText(url: string): string {
  return [
    'Confirm your new Finnoybu email address.',
    '',
    'Click within 60 minutes to switch your account to this address:',
    '',
    url,
    '',
    "If you didn't request this, ignore this email — your account is unchanged.",
    '',
    '— Finnoybu',
    'https://finnoybu.com',
  ].join('\n');
}

function shellHtml(heading: string, body: string, ctaLabel: string, url: string): string {
  return `<!doctype html>
<html><body style="font-family:Georgia,'Times New Roman',serif;color:#1c1814;background:#f5efe2;padding:2rem;line-height:1.6;max-width:840px;margin:0 auto;">
  <p style="font-size:0.75rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#6e665a;margin:0 0 1.5rem;">Finnoybu</p>
  <p style="font-size:1.125rem;margin:0 0 1rem;font-weight:600;">${heading}</p>
  <p style="margin:0 0 1.5rem;">${body}</p>
  <p style="margin:0 0 1.5rem;">
    <a href="${escapeHtml(url)}" style="display:inline-block;background:#1c1814;color:#f5efe2;padding:0.75rem 1.25rem;text-decoration:none;font-weight:600;font-family:Inter,system-ui,sans-serif;font-size:0.95rem;">${ctaLabel}</a>
  </p>
  <p style="margin:0 0 1.5rem;font-size:0.875rem;color:#6e665a;">Or paste this URL into your browser:<br><span style="word-break:break-all;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:0.8125rem;">${escapeHtml(url)}</span></p>
  <hr style="border:0;border-top:1px solid #d4cab2;margin:2rem 0;">
  <p style="font-size:0.875rem;color:#6e665a;margin:0;">If you didn't request this, ignore this email — your account is safe.</p>
</body></html>`;
}

function magicHtml(url: string): string {
  return shellHtml(
    'Sign in to Finnoybu',
    'Click the link below within the next 60 minutes to complete sign-in.',
    'Sign in',
    url,
  );
}

function resetHtml(url: string): string {
  return shellHtml(
    'Reset your password',
    'Click the link below within the next 60 minutes to choose a new password.',
    'Reset password',
    url,
  );
}

function verifyHtml(url: string): string {
  return shellHtml(
    'Verify your email',
    'Click the link below to confirm this email address belongs to you.',
    'Verify email',
    url,
  );
}

function changeEmailHtml(url: string): string {
  return shellHtml(
    'Confirm your new email',
    'Click the link below within the next 60 minutes to switch your Finnoybu account to this email address.',
    'Confirm new email',
    url,
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
