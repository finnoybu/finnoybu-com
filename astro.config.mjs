import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

// SSR on Cloudflare Pages — needed for /api/auth/* (Better Auth catch-all
// handler centralizes OAuth + session for the whole .finnoybu.com family).
// The public pages all carry `export const prerender = true`, so they
// remain static; only the auth routes run server-side.
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
  integrations: [
    sitemap(),
    tailwind({ applyBaseStyles: false }),
  ],
});
