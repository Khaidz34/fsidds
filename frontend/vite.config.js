import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/fsidds/', // Tên repository GitHub của bạn
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})