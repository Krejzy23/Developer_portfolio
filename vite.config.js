import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb','**/*.fbx','**/*.gltf'],
  build: {
    chunkSizeWarningLimit: 1500, // Zvýšení limitu na 1000 kB
  }
})
