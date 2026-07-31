import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://kevincastro.dev',

  markdown: {
    shikiConfig: {
      wrap: true,
    },
  },

  integrations: [sitemap()],
});
