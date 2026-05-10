import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    preview: {
      host: "0.0.0.0",
      allowedHosts: true,
    },
    server: {
      host: "0.0.0.0",
      allowedHosts: true,
    },
  },
});