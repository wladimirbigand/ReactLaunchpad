import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ReactLaunchpad/', // ⚠️ À REMPLACER par le nom de ton repo GitHub
})