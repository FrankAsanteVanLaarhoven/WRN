import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@contracts': path.resolve(__dirname, '../')
    }
  },
  server: {
    port: 3000,
    strictPort: true,
    host: '127.0.0.1'
  },
  preview: {
    port: 3000,
    strictPort: true,
    host: '127.0.0.1'
  }
});

