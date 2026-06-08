// Catch-all Better Auth handler. Mounts every /api/auth/* route —
// sign-in, sign-up, sign-out, get-session, magic-link, OAuth callbacks, etc.
//
// This is the *central* auth host for the Finnoybu family of sites. The
// session cookie is scoped to `.finnoybu.com`, so once it's set here it
// carries to fiction.finnoybu.com and memoirs.finnoybu.com natively.

import type { APIRoute } from 'astro';
import { createAuth } from '~/lib/auth';
import { getEnv, isAuthConfigured } from '~/lib/env';
import { isDbConfigured } from '~/db';
import { authOptionsFromEnv } from '~/middleware';

export const prerender = false;

const handler: APIRoute = async (ctx) => {
  const env = getEnv();
  if (!isDbConfigured() || !isAuthConfigured(env)) {
    return new Response(
      JSON.stringify({
        error: 'Auth not configured',
        detail:
          'Server is missing D1 binding or BETTER_AUTH_SECRET. Configure wrangler.toml and Cloudflare secrets.',
      }),
      { status: 503, headers: { 'content-type': 'application/json' } },
    );
  }

  // Use the request origin so OAuth redirect_uris and reset-link emails
  // resolve to the host the user is actually on (see middleware comment).
  const auth = createAuth(authOptionsFromEnv(env, ctx.url.origin));
  return auth.handler(ctx.request);
};

export const GET = handler;
export const POST = handler;
