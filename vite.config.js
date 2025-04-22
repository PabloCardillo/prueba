import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,
  },
  build: {
    outDir: 'dist',
  },
  base: '/',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // 👇 Esto es CLAVE para evitar error 404 con rutas internas
  preview: {
    port: 4173,
  },
  // 👇 Esto también es necesario para producción si usás GitHub Pages u otro hosting
  define: {
    'process.env': {}
  }
});

