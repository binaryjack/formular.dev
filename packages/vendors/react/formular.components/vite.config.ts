import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { checker } from 'vite-plugin-checker'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [
        react(),
        checker({
            typescript: true
        }),
        dts()
    ],
    server: {
        open: true,
        port: 3000,
        sourcemapIgnoreList: () => false, // Don't ignore any source maps for debugging
        hmr: {
            overlay: true
        },
        fs: {
            allow: ['..', '../../../lib/src', '../../../lib'] // Allow access to lib source and dist
        }
    },
    define: {
        'process.env': {}
    },
    esbuild: {
        // jsxFactory: 'h',
        // jsxFragment: 'Fragment'
    },
    optimizeDeps: {
        include: ['formular.dev.lib']
    },
    build: {
        outDir: 'dist',
        chunkSizeWarningLimit: 1600,
        sourcemap: true, // Enable source maps for debugging
        rollupOptions: {
            external: ['formular.dev.lib'], // Externalize the library for production builds
            output: {
                globals: {
                    'formular.dev.lib': 'formularDev'
                }
            }
        }
    },
    resolve: {
        alias: {
            '@tests': resolve(__dirname, 'src/__tests__'),
            '@mocks': resolve(__dirname, 'src/mocks'),
            '@components': resolve(__dirname, 'src/components'),
            '@adapters': resolve(__dirname, 'src/adapters'),
            '@demo': resolve(__dirname, 'src/demo'),
            '@patterns': resolve(__dirname, 'src/patterns'),
            '@style': resolve(__dirname, 'src/style'),
            '@utils': resolve(__dirname, 'src/utils'),
            // Map lib to source for debugging in development only
            'formular.dev.lib': resolve(__dirname, '../../../lib/src/index.ts'),
            'formular.dev.lib/': resolve(__dirname, '../../../lib/src/')
        }
    }
})
