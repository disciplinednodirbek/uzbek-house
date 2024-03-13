import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      routes: path.resolve(__dirname, "./src/routes"),
      layout: path.resolve(__dirname, "./src/layout"),
      pages: path.resolve(__dirname, "./src/pages"),
      components: path.resolve(__dirname, "./src/components"),
      assets: path.resolve(__dirname, "./src/assets"),
      context: path.resolve(__dirname, "./src/context"),
    },
  },
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
});
