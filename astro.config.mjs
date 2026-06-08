import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// SSR on Cloudflare WORKERS (migrated from Pages 2026-06; adapter v13 is
// Workers-only) — needed for /api/auth/* (Better Auth catch-all handler
// centralizes OAuth + session for the whole .finnoybu.com family). The public
// pages all carry `export const prerender = true`, so they remain static; only
// the auth routes run server-side. The adapter builds to dist/client +
// dist/server and generates dist/server/wrangler.json (the deploy config);
// route handlers read bindings via `import { env } from 'cloudflare:workers'`.
//
// Tailwind v3 is wired via postcss.config.js (the @astrojs/tailwind integration
// has no Astro 6 build).
export default defineConfig({
  site: 'https://finnoybu.com',
  trailingSlash: 'never',
  output: 'server',
  adapter: cloudflare({
    imageService: 'compile',
  }),
  build: {
    format: 'directory',
  },
  // Disable Astro's blanket cross-origin POST block. Sign in with Apple uses
  // response_mode=form_post — appleid.apple.com cross-site POSTs the OAuth
  // result to /api/auth/callback/apple. Astro's security.checkOrigin (default
  // true) intercepts that with a 403 before our handler runs, even though it's
  // the legitimate OAuth callback. The only routes that accept POST on this
  // site are under /api/auth/*, which is Better Auth — and Better Auth runs its
  // own CSRF defense (validateFormCsrf + trustedOrigins + signed state cookie
  // matched against the OAuth state param), so we aren't losing CSRF protection
  // by turning Astro's blanket guard off.
  security: {
    checkOrigin: false,
  },
  integrations: [
    sitemap(),
  ],
});
