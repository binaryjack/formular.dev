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
    }
}))
