import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import MillionLint from '@million/lint';

// https://vite.dev/config/
// MillionLint es una herramienta de diagnóstico: solo se activa con `npm run dev`.
export default defineConfig(({ command }) => ({
  plugins: [
    MillionLint.vite({
      enabled: command === 'serve'
    }),
    react()
  ],
  base: '/',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
}))
