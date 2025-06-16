import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
            include: ['src/**/*'],
            exclude: ['src/**/*.test.*', 'src/**/*.spec.*', 'src/**/*.stories.*']
        })
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'FormularDesignSystem',
            formats: ['es', 'umd'],
            fileName: format => `index.${format === 'es' ? 'esm' : format}.js`
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM'
                }
            }
        },
        sourcemap: true,
        emptyOutDir: true
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@components': resolve(__dirname, 'src/components'),
            '@tokens': resolve(__dirname, 'src/tokens'),
            '@utilities': resolve(__dirname, 'src/utilities'),
            '@types': resolve(__dirname, 'src/types'),
            '@hooks': resolve(__dirname, 'src/hooks')
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/tokens/index.scss";`
            }
        }
    }
})
