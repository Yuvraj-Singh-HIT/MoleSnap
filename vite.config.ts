import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/",
  server: {
    host: "::",
    port: 5173,
    strictPort: true,
    open: true,
    // Handle SPA fallback for client-side routing
    history: {
      // This ensures Vite serves index.html for all routes
      // This is necessary for client-side routing to work
      // when refreshing the page or directly accessing a route
      // other than the root
      // https://vitejs.dev/config/#server-historyapifallback
      historyApiFallback: true,
    },
    // Proxy API requests if needed
    proxy: {
      '/api': {
        target: 'http://localhost:5173',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: mode === "development",
    // Ensure proper handling of client-side routing in production
    rollupOptions: {
      output: {
        // Ensures that all assets are properly hashed for cache busting
        assetFileNames: 'assets/[name]-[hash][extname]',
        // Ensures that chunks are properly split
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          vendor: ['framer-motion', 'lucide-react'],
        },
      },
    },
  },
  preview: {
    port: 5173,
    strictPort: true,
  },
}));
