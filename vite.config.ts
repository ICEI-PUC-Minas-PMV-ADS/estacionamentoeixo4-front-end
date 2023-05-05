import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import "dotenv/config";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.VITE_PORT) || 20002,
  },
  envDir: ".",
  plugins: [react()],
});
