import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "../backend/src/shared"),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://portfolio-backend-1cz4.onrender.com/',
        changeOrigin: true,
      }
    }
  }
});
