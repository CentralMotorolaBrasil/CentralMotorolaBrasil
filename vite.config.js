import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    },
  },
  server: {
    warmup: {
      clientFiles: [
        './src/views/HomeView.vue',
        './src/data/devices/index.js',
        './src/utils/i18n.js',
      ],
    },
  },
})