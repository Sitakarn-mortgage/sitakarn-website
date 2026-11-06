import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    port: 5137,
    allowedHosts: [
      'full-classic-terrier.ngrok-free.app',
    ],
  },
  preview: {
    port: 5137,
  },
  build: {
    target: 'es2020',
  },
});
