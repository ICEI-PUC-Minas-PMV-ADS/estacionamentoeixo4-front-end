import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import "dotenv/config";
import * as path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.VITE_PORT) || 20002,
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
      "@images": path.resolve(__dirname, "./src/services"),
      "@layout": path.resolve(__dirname, "./src/layout"),
    },
  },
});
