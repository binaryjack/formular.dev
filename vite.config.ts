import { resolve } from 'path'
import { defineConfig } from 'vite'
import { checker } from 'vite-plugin-checker'
import dts from 'vite-plugin-dts'

import react from '@vitejs/plugin-react-swc'

export default defineConfig(() => ({
    plugins: [
        react(),
        checker({
            typescript: true
        }),
        dts()
    ],
    server: {
        open: true,
        port: 3000
    },
    define: {
        'process.env': {}
    },
    esbuild: {
        // jsxFactory: 'h',
        // jsxFragment: 'Fragment'
    },
    build: {
        outDir: 'dist',
        chunkSizeWarningLimit: 1600
    },
    resolve: {
        alias: {
            '@components': resolve(__dirname, 'src/components'),
            '@core': resolve(__dirname, 'src/core'),
            '@dependency': resolve(__dirname, 'src/dependency'),
            '@demo': resolve(__dirname, 'src/demo'),
            '@patterns': resolve(__dirname, 'src/patterns'),
            '@style': resolve(__dirname, 'src/style'),
            '@utils': resolve(__dirname, 'src/utils')
        }
    }
}))
