import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { checker } from 'vite-plugin-checker'
import dts from 'vite-plugin-dts'

export default defineConfig(({ mode }) => {
    const isDevelopment = mode === 'development'

    return {
        plugins: [
            react({
                // Add proper JSX runtime configuration for debugging
                jsxImportSource: '@emotion/react'
            }),
            checker({
                typescript: true
            }),
            // Remove dts plugin from React app - it's not needed here
            ...(isDevelopment ? [] : [dts()])
        ],
        server: {
            open: true,
            port: 3000,
            host: 'localhost', // Explicit host for debugging
            sourcemapIgnoreList: () => false, // Don't ignore any source maps for debugging
            hmr: {
                overlay: true,
                port: 24678 // Different port to avoid conflicts
            },
            fs: {
                allow: ['..', '../../../lib/src', '../../../lib/dist'] // Allow access to lib source and dist
            }
        },
        define: {
            'process.env': {},
            global: 'globalThis' // Fix global references
        },
        esbuild: {
            // jsxFactory: 'h',
            // jsxFragment: 'Fragment'
        },
        optimizeDeps: {
            include: [
                'formular.dev.lib',
                'react',
                'react-dom',
                'react/jsx-runtime',
                'react/jsx-dev-runtime'
            ],
            force: isDevelopment // Force rebuild in development
        },
        build: {
            outDir: 'dist',
            chunkSizeWarningLimit: 1600,
            sourcemap: true, // Enable source maps for debugging
            minify: !isDevelopment, // Don't minify in development
            rollupOptions: {
                // Don't externalize in development
                ...(isDevelopment
                    ? {}
                    : {
                          external: ['formular.dev.lib'],
                          output: {
                              globals: {
                                  'formular.dev.lib': 'formularDev'
                              }
                          }
                      })
            }
        },
        resolve: {
            alias: {
                '@tests': resolve(__dirname, 'src/__tests__'),
                '@mocks': resolve(__dirname, 'src/mocks'),
                '@components': resolve(__dirname, 'src/components'),
                '@adapters': resolve(__dirname, 'src/adapters'),
                '@demo': resolve(__dirname, 'src/showcase/demo'),
                '@showcase': resolve(__dirname, 'src/showcase'),
                '@patterns': resolve(__dirname, 'src/patterns'),
                '@style': resolve(__dirname, 'src/style'),
                '@utils': resolve(__dirname, 'src/utils'),
                '@pages': resolve(__dirname, 'src/pages'),
                // Add alias for the lib to help with source mapping
                'formular.dev.lib': resolve(__dirname, '../../../lib/src/index.ts'),
                // Add alias for the design system to help with CSS imports
                'formular.design.system': resolve(__dirname, '../../../design-system/src/index.ts'),
                'formular.design.system/styles': resolve(
                    __dirname,
                    '../../../design-system/src/styles/index.css'
                )
            }
        },
        // Ensure proper CSS handling for Emotion
        css: {
            devSourcemap: true,
            preprocessorOptions: {
                scss: {
                    additionalData: ''
                }
            }
        }
    }
})
