import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      mocks: fileURLToPath(new URL('../mocks', import.meta.url)),
    },
  },
});
