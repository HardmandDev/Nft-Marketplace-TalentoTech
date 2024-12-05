import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import MillionLint from '@million/lint';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    MillionLint.vite({
      enabled: true
    }),
    react()
  ],
  base: '/',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
