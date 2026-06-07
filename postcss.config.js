// PostCSS pipeline for Astro. Tailwind processes utility classes; Autoprefixer
// adds vendor prefixes for the browser targets in browserslist (Astro default).
// Replaces the @astrojs/tailwind integration, which has no Astro 6 build.
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
