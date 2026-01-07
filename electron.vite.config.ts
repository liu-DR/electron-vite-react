import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    server: {
      port: 9000,
      fs: {
        strict: false
      }
      // open: true  // 是否自动打开浏览器
    },
    build: {
      rollupOptions: {
        input: {
          index: path.resolve(__dirname, 'index.html')
        },
      },
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    plugins: [react()],
    resolve: {
      alias: {
        // 设置别名
        '@': path.resolve(__dirname, 'src')
      }
    },
    css: {
      // 预处理器
      preprocessorOptions: {
        less: {
          math: 'always'
        }
      }
    }
  }
})
