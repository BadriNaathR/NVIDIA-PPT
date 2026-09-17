import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative asset paths so the production build also works opened directly via
  // file:// (no server/Node.js needed) — the offline backup-plan requirement.
  base: './',
  plugins: [react(), tailwindcss()],
})
