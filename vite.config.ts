import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

const lessResources: Array<String> = []
fs.readdirSync('src/assets/styles').map((dirname) => {
    if (fs.statSync(`src/assets/styles/${dirname}`).isFile()) {
        lessResources.push(`@import "src/assets/styles/${dirname}";`)
    }
})

export default defineConfig({
    server: {
        port: 8080,
        fs: {
            strict: false
        },
        // open: true

    },
    plugins: [react()],
    resolve: {
        alias: {
            // 设置别名
            "@": path.resolve(__dirname, 'src')
        },
    },
    css: {
        // 预处理器
        preprocessorOptions: {
            less: {
                math: 'always',
                javascriptEnabled: true,
                charset: false,
            }
        }
    },
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