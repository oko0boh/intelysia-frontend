import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // WebP plugin will be added when npm install works
    // Critical CSS extraction will be configured here
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Core Web Vitals optimization
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor packages for better caching
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['lucide-react', 'clsx', 'tailwind-merge'],
          maps: ['leaflet', 'react-leaflet'],
          utils: ['axios', 'papaparse']
        }
      }
    },
    // Optimize chunk size for LCP
    chunkSizeWarningLimit: 1000,
  },
  server: {
    // Enable compression
    middlewareMode: false,
  },
  // Image optimization placeholder (will be enhanced with plugins)
  assetsInclude: ['**/*.webp'],
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
});
