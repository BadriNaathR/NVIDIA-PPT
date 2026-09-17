import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Backup-plan build: bundles the entire deck — JS, CSS, and every image — into one
// standalone dist-offline/index.html. No Node.js, no dev server, no network needed
// to run it; double-clicking the file opens the full presentation in any browser.
// (Google Fonts still load from the CDN if online; falls back to system fonts if not.)
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), viteSingleFile()],
  build: {
    outDir: 'dist-offline',
    assetsInlineLimit: 100 * 1024 * 1024, // inline every asset (including the team photos) as base64
    cssCodeSplit: false,
  },
})
