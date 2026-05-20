import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// Static build. No SSR/adapter; the site has no auth, no DB, no API routes.
// If those become needed later, swap in @astrojs/cloudflare and convert
// individual routes to output:'server'.
export default defineConfig({
  site: 'https://finnoybu.com',
  trailingSlash: 'never',
  integrations: [
    sitemap(),
    tailwind({ applyBaseStyles: false }),
  ],
});
