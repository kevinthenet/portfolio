import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://kevincastro.dev",
  integrations: [react()],
  markdown: {
    wrap: true,
  },
});
