import { defineConfig } from 'vite';

export default defineConfig({
  base: '/mordoo/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});
