import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import yaml from '@rollup/plugin-yaml'
import path from 'path'

export default defineConfig({
  plugins: [vue(), svgLoader(), yaml()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
