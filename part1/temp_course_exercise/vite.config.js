import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permet l'accès depuis n'importe quelle adresse IP du réseau local
    port: 5174,     // Le port que vous utilisez
  },
})
