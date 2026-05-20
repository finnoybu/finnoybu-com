# finnoybu.com

Kenneth Tannenbaum — personal landing page.

## Concept

A stratified, vertical-scroll page that **enacts the author's trajectory**: the visual language progresses top-to-bottom from the AEGIS-architect aesthetic (cool, structured, scholarly) down through the published creative works (each picking up its own subsite's design language) into the Finn-hobbyist origin at the bottom (warm, hand-honest, Python hello-world). Each project lives in the stratum where it was born, in the design vocabulary of that era. The aesthetic *is* the autobiography.

## Stack

- Astro 5 (static output)
- Tailwind 3 with custom design tokens per stratum
- Google Fonts: Fraunces (display), EB Garamond (serif), Inter (sans), JetBrains Mono (mono)
- No backend, no auth, no DB — static deploy

## Commands

- `npm run dev` — local dev server
- `npm run build` — production build (runs `astro check && astro build`)
- `npm run preview` — serve built output
