import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactRefresh from '@vitejs/plugin-react-refresh'
const path = require('path');
const fs = require('fs');

const lessResources: Array<String> = []
fs.readdirSync('src/assets/styles').map((dirname: string) => {
  if (fs.statSync(`src/assets/styles/${dirname}`).isFile()) {
    lessResources.push(`@import "src/assets/styles/${dirname}";`)
  }
})

export default defineConfig({
  // base: './',
  server: {
    host: 'localhost',
    port: 8080,
    fs: {
      strict: false
    },
    cors: true
    // open: true
  },
  plugins: [react(), reactRefresh()],
  resolve: {
    alias: {
      // 设置别名
      '@/': path.resolve(__dirname, 'src/')
    },
    extensions: ['.tsx', '.jsx', '.ts', '.js', '.json']
  },
  // css模块配置
  css: {
    // 预处理器
    preprocessorOptions: {
      less: {
        math: 'always',
        javascriptEnabled: true,
        charset: false
      }
    }
  },
  // 打包配置
  build: {
    outDir: 'dist',
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: false
      }
    }
  }
})
