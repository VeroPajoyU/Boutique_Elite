import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // La ruta raíz para servir archivos estáticos
    root: './src',
    // Opcional: Configura el servidor para servir archivos estáticos desde la carpeta 'assets'
    serve: {
      cors: true,
      open: true,
      middlewareMode: 'ssr',
      fileServer: {
        serveStatic: [
          { route: '/assets', directory: './assets' }
        ]
      },
      proxy: {
        '/api': 'http://localhost:3000',
      }
    }
  }
})