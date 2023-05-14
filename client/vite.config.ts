import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
// import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
// import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({ minify: true }),
    // svgr(),
    // ViteImageOptimizer({
    //   png: {
    //     quality: 80,
    //   },
    //   jpg: {
    //     quality: 80,
    //   },
    //   jpeg: {
    //     quality: 80,
    //   },
    //   webp: {
    //     quality: 80,
    //   },
    // }),
  ],
  build: {
    outDir: '../server/public',
    emptyOutDir: true,
  },
});
