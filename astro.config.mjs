import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Sostituisci con il tuo utente e il nome della repo
  site: 'https://gdeber.github.io',

  base: '/debe-portfolio',
  output: 'static',
  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});