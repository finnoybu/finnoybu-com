/// <reference path="../.astro/types.d.ts" />
/// <reference types="@cloudflare/workers-types" />

// Cloudflare bindings + env vars surfaced via Astro.locals.runtime.env on
// SSR requests. Mirrors the production schema of `wrangler.toml`.
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

declare namespace App {
  interface Locals {
    runtime: {
      env: Env;
    };
    user: { id: string; email: string; name: string | null } | null;
  }
}

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
