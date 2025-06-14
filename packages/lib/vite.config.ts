import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig(() => ({
    define: {
        'process.env': {}
    },
    esbuild: {
        // jsxFactory: 'h',
        // jsxFragment: 'Fragment'
    },
    plugins: [
        dts({
            insertTypesEntry: true,
            outDir: 'dist/types'
        })
    ],
    build: {
        outDir: 'dist',
        chunkSizeWarningLimit: 1600,
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'formular.dev',
            formats: ['es', 'cjs'],
            fileName: (format) => `formular-dev.${format}.js`
        }
    },
    resolve: {
        alias: {
            '@tests': resolve(__dirname, 'src/__tests__'),
            '@mocks': resolve(__dirname, 'src/mocks'),
            '@conventions': resolve(__dirname, 'src/conventions'),
            '@project': resolve(__dirname, 'src/project'),
            '@core': resolve(__dirname, 'src/core'),
            '@fields': resolve(__dirname, 'src/core/fields'),
            '@factory': resolve(__dirname, 'src/core/factory'),
            '@framework': resolve(__dirname, 'src/core/framework'),
            '@utility': resolve(__dirname, 'src/core/framework/utility'),
            '@common': resolve(__dirname, 'src/core/framework/common'),
            '@patterns': resolve(__dirname, 'src/patterns'),
            '@utils': resolve(__dirname, 'src/utils')
        }
    }
}))
