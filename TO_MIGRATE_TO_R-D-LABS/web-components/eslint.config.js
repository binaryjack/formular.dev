import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import lit from 'eslint-plugin-lit';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      '@typescript-eslint': tseslint,
      'lit': lit
    },
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        browser: true,
        es6: true,
        node: true,
        jest: true
      }
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/prefer-const': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'lit/no-invalid-html': 'error',
      'lit/no-useless-template-literals': 'error',
      'lit/attribute-value-entities': 'error',
      'lit/binding-positions': 'error',
      'lit/no-duplicate-template-bindings': 'error',
      'lit/no-property-change-update': 'error'
    }
  },
  {
    ignores: [
      'dist/',
      'node_modules/',
      '*.config.js',
      '*.config.ts'
    ]
  }
];
