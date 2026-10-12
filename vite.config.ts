import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// Vercel's cleanUrls serves /agenda from agenda/index.html; Vite needs the trailing slash, so add it locally.
const cleanUrls: Plugin = {
  name: "clean-urls",
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (req.url === "/agenda" || req.url?.startsWith("/agenda?")) {
        req.url = req.url.replace("/agenda", "/agenda/");
      }
      next();
    });
  },
};

export default defineConfig({
  plugins: [react(), cleanUrls],
  server: {
    port: 5180,
    hmr: {
      overlay: false,
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        agenda: resolve(import.meta.dirname, "agenda/index.html"),
      },
    },
  },
});
