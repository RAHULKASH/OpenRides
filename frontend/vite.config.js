import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api':'http://localhost:8000',
    },
    //host: '0.0.0.0', // This allows access from any IP address
    port: 3000, // You can specify any port you want
  },
  plugins: [react(),tailwindcss()],

})
