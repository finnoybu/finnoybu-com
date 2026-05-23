import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{astro,html,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Stratum 1 — Architect (deep navy)
        'stratum-deep': '#0d1620',
        'stratum-deep-ink': '#ece4d0',
        'stratum-deep-muted': '#a9afba',
        'stratum-deep-rule': '#23303e',

        // Stratum mid — Craft / Publish
        'stratum-mid': '#2d2a26',
        'stratum-mid-ink': '#d4cdbb',
        'stratum-mid-muted': '#9a907e',

        // Stratum warm — Reconstruct
        'stratum-warm': '#5a5249',
        'stratum-warm-ink': '#f1e8d2',

        // Stratum light — Origin (parchment)
        'stratum-light': '#f6f1e4',
        'stratum-light-ink': '#1a1611',
        'stratum-light-muted': '#5a4f3f',
        'stratum-light-rule': '#c7bb9e',

        // Shared accents
        brass: '#a8763e',
        accent: '#1d3a52',
        'accent-hi': '#2d5a7f',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        serif: ['EB Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'Menlo', 'monospace'],
      },
      maxWidth: {
        shell: '68rem',
        prose: '38rem',
      },
      letterSpacing: {
        wider: '0.08em',
        widest: '0.22em',
      },
    },
  },
  plugins: [],
};

export default config;
