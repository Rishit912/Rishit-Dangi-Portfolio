import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ This ensures that the /public folder is included in the build output
export default defineConfig({
  plugins: [react()],
  publicDir: 'public', // ensures Vite copies all files (like your PDF) to the final build
})
