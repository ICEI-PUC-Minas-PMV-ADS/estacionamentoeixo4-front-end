import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    strictPort: true,
    port: 8000
  },
  envDir: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@images": path.resolve(__dirname, "./src/images"),
      "@layout": path.resolve(__dirname, "./src/layout"),
    },
  },
});
