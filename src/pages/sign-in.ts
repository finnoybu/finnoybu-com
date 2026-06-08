// Central OAuth entry point for the .finnoybu.com family.
//
// The reader sites (fiction / memoirs) can't run OAuth themselves — all four
// providers are registered with a single callback on finnoybu.com — so their
// auth modals redirect the browser here as:
//   https://finnoybu.com/sign-in?provider=<p>&callbackURL=<reader-site-url>
//
// This route initiates the Better Auth social flow SERVER-SIDE and 302s the
// browser straight to the provider. The user never sees an intermediate page
// (this replaces the old "Phase 1 test" harness). Direct visits with no
// provider are sent home rather than shown a sign-in screen.

import type { APIRoute } from 'astro';
import { createAuth } from '~/lib/auth';
import { authOptionsFromEnv } from '~/middleware';
import { getEnv, isAuthConfigured } from '~/lib/env';
import { isDbConfigured } from '~/db';

export const prerender = false;

const ALLOWED_PROVIDERS = new Set(['google', 'facebook', 'github', 'apple']);

export const GET: APIRoute = async (ctx) => {
  const provider = ctx.url.searchParams.get('provider');
  const callbackURL =
    ctx.url.searchParams.get('callbackURL') || 'https://finnoybu.com/';

  // No / unknown provider → never expose a sign-in screen; go home.
  if (!provider || !ALLOWED_PROVIDERS.has(provider)) {
    return ctx.redirect('/');
  }

  const env = getEnv();
  if (!isDbConfigured() || !isAuthConfigured(env)) {
    return ctx.redirect('/?auth_error=config');
  }

  const auth = createAuth(authOptionsFromEnv(env, ctx.url.origin));

  // Reuse the proven Better Auth social endpoint server-side. The OAuth start
  // needs no inbound cookies — it mints a fresh state cookie and returns the
  // provider authorization URL.
  const startRes = await auth.handler(
    new Request(`${ctx.url.origin}/api/auth/sign-in/social`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ provider, callbackURL }),
    }),
  );

  if (!startRes.ok) {
    return ctx.redirect('/?auth_error=start');
  }

  const data = (await startRes.json().catch(() => null)) as { url?: string } | null;
  if (!data?.url) {
    return ctx.redirect('/?auth_error=nourl');
  }

  // 302 to the provider, forwarding the Better Auth state cookie(s) verbatim.
  const headers = new Headers({ Location: data.url });
  const setCookies =
    startRes.headers.getSetCookie?.() ??
    (startRes.headers.get('set-cookie') ? [startRes.headers.get('set-cookie') as string] : []);
  for (const cookie of setCookies) headers.append('set-cookie', cookie);

  return new Response(null, { status: 302, headers });
};
