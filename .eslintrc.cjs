module.exports = {
    root: true,
    env: { browser: true, es2020: true, node: true },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'prettier'
    ],
    ignorePatterns: ['build', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', 'react', '@typescript-eslint', 'react-hooks', 'prettier'],
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'no-console': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-empty': 'off',
        'no-useless-escape': 'off',
        'no-prototype-builtins': 'off',
        'react/react-in-jsx-scope': 'off'
    }
}
