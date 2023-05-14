// vite.config.ts
import { defineConfig } from "file:///E:/_PROGRAMMING/projects/comfy/client/node_modules/vite/dist/node/index.js";
import react from "file:///E:/_PROGRAMMING/projects/comfy/client/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { createHtmlPlugin } from "file:///E:/_PROGRAMMING/projects/comfy/client/node_modules/vite-plugin-html/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({ minify: true })
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
    outDir: "../server/public",
    emptyOutDir: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxfUFJPR1JBTU1JTkdcXFxccHJvamVjdHNcXFxcY29tZnlcXFxcY2xpZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxfUFJPR1JBTU1JTkdcXFxccHJvamVjdHNcXFxcY29tZnlcXFxcY2xpZW50XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9fUFJPR1JBTU1JTkcvcHJvamVjdHMvY29tZnkvY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHsgY3JlYXRlSHRtbFBsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLWh0bWwnO1xuLy8gaW1wb3J0IHsgVml0ZUltYWdlT3B0aW1pemVyIH0gZnJvbSAndml0ZS1wbHVnaW4taW1hZ2Utb3B0aW1pemVyJztcbi8vIGltcG9ydCBzdmdyIGZyb20gJ3ZpdGUtcGx1Z2luLXN2Z3InO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBjcmVhdGVIdG1sUGx1Z2luKHsgbWluaWZ5OiB0cnVlIH0pLFxuICAgIC8vIHN2Z3IoKSxcbiAgICAvLyBWaXRlSW1hZ2VPcHRpbWl6ZXIoe1xuICAgIC8vICAgcG5nOiB7XG4gICAgLy8gICAgIHF1YWxpdHk6IDgwLFxuICAgIC8vICAgfSxcbiAgICAvLyAgIGpwZzoge1xuICAgIC8vICAgICBxdWFsaXR5OiA4MCxcbiAgICAvLyAgIH0sXG4gICAgLy8gICBqcGVnOiB7XG4gICAgLy8gICAgIHF1YWxpdHk6IDgwLFxuICAgIC8vICAgfSxcbiAgICAvLyAgIHdlYnA6IHtcbiAgICAvLyAgICAgcXVhbGl0eTogODAsXG4gICAgLy8gICB9LFxuICAgIC8vIH0pLFxuICBdLFxuICBidWlsZDoge1xuICAgIG91dERpcjogJy4uL3NlcnZlci9wdWJsaWMnLFxuICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJTLFNBQVMsb0JBQW9CO0FBQ3hVLE9BQU8sV0FBVztBQUNsQixTQUFTLHdCQUF3QjtBQUlqQyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixpQkFBaUIsRUFBRSxRQUFRLEtBQUssQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBZ0JuQztBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsYUFBYTtBQUFBLEVBQ2Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
