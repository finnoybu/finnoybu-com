/// <reference path="../.astro/types.d.ts" />
/// <reference types="@cloudflare/workers-types" />

type Runtime = import('@astrojs/cloudflare').Runtime;

// Cloudflare bindings + env vars. Accessed at runtime via
// `import { env } from 'cloudflare:workers'` (Astro v6 / adapter v13+);
// mirrors the production schema of `wrangler.toml`.
type Env = {
  DB: D1Database;

  // Better Auth
  BETTER_AUTH_SECRET: string;
  COOKIE_DOMAIN?: string;

  // OAuth providers (client IDs are public + live in vars; secrets in dashboard)
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  FACEBOOK_CLIENT_ID?: string;
  FACEBOOK_CLIENT_SECRET?: string;
  APPLE_CLIENT_ID?: string;
  APPLE_CLIENT_SECRET?: string;
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;

  // AWS SES (transactional email)
  AWS_ACCESS_KEY_ID?: string;
  AWS_SECRET_ACCESS_KEY?: string;
  AWS_REGION?: string;
  EMAIL_FROM?: string;

  // Public
  PUBLIC_SITE_URL?: string;
};

// Augment cloudflare:workers to expose typed env bindings (Astro v6 / adapter v13+)
declare module 'cloudflare:workers' {
  const env: Env;
  export { env };
}

declare namespace App {
  interface Locals extends Runtime {
    // Set by middleware on every non-prerendered request.
    user: { id: string; email: string; name: string | null } | null;
  }
}

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
