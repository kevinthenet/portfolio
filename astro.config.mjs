import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://kevincastro.dev',
  markdown: {
    shikiConfig: {
      wrap: true,
    },
  },
});
