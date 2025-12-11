import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    // This ensures Vite serves index.html for all routes
    // This is necessary for client-side routing to work
    // when refreshing the page or directly accessing a route
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
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
});
