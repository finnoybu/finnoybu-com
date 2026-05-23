import type { APIRoute } from 'astro';
import { PRIVACY_SECTIONS, PRIVACY_LAST_UPDATED } from '~/data/privacy';

export const prerender = true;

// Publishes the canonical Privacy Policy as JSON at /privacy.json so the other
// *.finnoybu.com sites can fetch it at build time and render it with their own
// CSS. Canonical source: src/data/privacy.ts. Prerendered to a static file.
export const GET: APIRoute = () =>
  new Response(
    JSON.stringify(
      { lastUpdated: PRIVACY_LAST_UPDATED, sections: PRIVACY_SECTIONS },
      null,
      2,
    ),
    { headers: { 'content-type': 'application/json; charset=utf-8' } },
  );
