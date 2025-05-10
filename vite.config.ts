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
            '@tests': resolve(__dirname, 'src/__tests__'),
            '@mocks': resolve(__dirname, 'src/mocks'),
            '@components': resolve(__dirname, 'src/components'),
            '@core': resolve(__dirname, 'src/core'),
            '@fields': resolve(__dirname, 'src/core/fields'),
            '@factory': resolve(__dirname, 'src/core/factory'),
            '@framework': resolve(__dirname, 'src/core/framework'),
            '@utility': resolve(__dirname, 'src/core/framework/utility'),
            '@common': resolve(__dirname, 'src/core/framework/common'),
            '@demo': resolve(__dirname, 'src/demo'),
            '@patterns': resolve(__dirname, 'src/patterns'),
            '@style': resolve(__dirname, 'src/style'),
            '@utils': resolve(__dirname, 'src/utils')
        }
    }
}))
