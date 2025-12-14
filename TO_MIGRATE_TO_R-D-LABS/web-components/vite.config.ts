import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      include: ['src/**/*'],
      exclude: ['src/**/__tests__/**/*', '**/*.test.*', '**/*.spec.*']
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'WebComponentsFormularDev',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'esm' : format}.js`
    },
    rollupOptions: {
      external: ['lit', 'lit-html', 'formular.dev.lib', 'formular.design.system'],
      output: {
        globals: {
          'lit': 'Lit',
          'lit-html': 'LitHtml',
          'formular.dev.lib': 'FormularDevLib',
          'formular.design.system': 'FormularDesignSystem'
        }
      }
    },
    sourcemap: true,
    minify: 'terser'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/components': resolve(__dirname, 'src/components'),
      '@/types': resolve(__dirname, 'src/types'),
      '@/interfaces': resolve(__dirname, 'src/interfaces'),
      '@/enums': resolve(__dirname, 'src/enums'),
      '@/utilities': resolve(__dirname, 'src/utilities')
    }
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  }
});
