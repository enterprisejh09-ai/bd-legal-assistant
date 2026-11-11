import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // Build syntax for older iPhone Safari versions as well as modern browsers.
  build: {
    target: 'safari13',
    cssTarget: 'safari13',
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
