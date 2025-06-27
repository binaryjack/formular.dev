import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig(({ mode }) => {
    const isDevelopment = mode === 'development'
    const isProduction = mode === 'production'

    return {
        define: {
            'process.env': {}
        },
        esbuild: {
            // jsxFactory: 'h',
            // jsxFragment: 'Fragment'
        },
        plugins: [
            dts({
                outDir: 'dist/types',
                tsconfigPath: './tsconfig.json',
                rollupTypes: true,
                copyDtsFiles: false,
                exclude: ['**/*.test.*', '**/*.spec.*']
            })
        ],
        build: {
            outDir: 'dist',
            chunkSizeWarningLimit: 1600,
            sourcemap: true, // Always generate external sourcemaps for debugging
            minify: isProduction ? 'esbuild' : false, // Only minify in production
            lib: {
                entry: resolve(__dirname, 'src/index.ts'),
                name: 'formular.dev',
                formats: ['es', 'cjs'],
                fileName: (format) => `formular-dev.${format}.js`,
                cssFileName: 'formular-dev'
            },
            rollupOptions: {
                // Externalize deps that shouldn't be bundled into the library
                external: [],
                output: {
                    // Provide global variables to use in the UMD build
                    globals: {},
                    // Enhanced source map configuration for development
                    ...(isDevelopment && {
                        sourcemap: true,
                        sourcemapExcludeSources: false // Include original sources in source maps
                    }),
                    // Only preserve modules in development for debugging, but with limits
                    ...(isDevelopment && {
                        preserveModules: false, // Disable for now to prevent excessive chunks
                        manualChunks: undefined
                    })
                }
            },
            // Development-specific optimizations
            ...(isDevelopment && {
                watch: {
                    buildDelay: 100,
                    clearScreen: false
                }
            }),
            // Production-specific optimizations
            ...(isProduction && {
                reportCompressedSize: true,
                chunkSizeWarningLimit: 500
            })
        },
        resolve: {
            alias: {
                '@tests': resolve(__dirname, 'src/__tests__'),
                '@mocks': resolve(__dirname, 'src/mocks'),
                '@core': resolve(__dirname, 'src/core'),
                '@setup': resolve(__dirname, 'src/setup'),
                '@fields': resolve(__dirname, 'src/core/fields'),
                '@factory': resolve(__dirname, 'src/core/factory'),
                '@framework': resolve(__dirname, 'src/core/framework'),
                '@utility': resolve(__dirname, 'src/core/framework/utility'),
                '@common': resolve(__dirname, 'src/core/framework/common'),
                '@utils': resolve(__dirname, 'src/utils')
            }
        }
    }
})
