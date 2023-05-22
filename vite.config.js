/*
 * @Date: 2023-05-17 17:19:42
 * @LastEditors: okzfans
 * @LastEditTime: 2023-05-19 12:18:57
 * @Description: nothing
 * Copyright (c) 2023 by okzfans, All Rights Reserved.
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createStyleImportPlugin } from 'vite-plugin-style-import'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'), // src 路径
            utils: path.resolve(__dirname, 'src/utils'), // utils 路径
            config: path.resolve(__dirname, 'src/config'), // config 路径
        },
    },
    plugins: [
        react(),
        createStyleImportPlugin({
            libs: [
                {
                    libraryName: 'zarm',
                    esModules: true,
                    resolveStyle: (name) => {
                        return `zarm/es/${name}/style/css`
                    },
                },
            ],
        }),
    ],
    build: {
        terserOptions: {
            //打包后移除console和注释
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
    },
    css: {
        modules: {
            localsConvention: 'dashesOnly',
        },
        preprocessorOptions: {
            less: {
                // 支持内联 JavaScript
                javascriptEnabled: true,
            },
        },
    },
    server: {
      proxy: {
        '/api': {
          // 当遇到 /api 路径时，将其转换成 target 的值
          target: 'http://localhost:7001',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '') // 将 /api 重写为空
        }
      }
    }
})
