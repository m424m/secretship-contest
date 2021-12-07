import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import yaml from '@rollup/plugin-yaml'
import path from 'path'

export default ({ mode }) => {
  process.env = { ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    plugins: [vue(), svgLoader(), yaml()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      'process.env': process.env,
    },
  })
}
