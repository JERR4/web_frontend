import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isTauri = process.env.TAURI_PLATFORM !== undefined;

export default defineConfig({
  plugins: [react()],
  base: "/web_frontend",
  server: {
    port: 3000,
    host: '0.0.0.0',
    proxy: !isTauri
      ? {
          "/api": {
            target: "http://192.168.1.45:8000",
            changeOrigin: true,
          },
        }
      : undefined,
  },
});