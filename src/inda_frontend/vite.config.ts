import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // ⬅️ Aquí definimos el alias "@"
    }
  },
  define: {
    'process.env.CANISTER_ID_BACKEND': JSON.stringify(process.env.CANISTER_ID_BACKEND)}

})
