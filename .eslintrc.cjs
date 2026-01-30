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
        'react/react-in-jsx-scope': 'off',
        'no-restricted-imports': [
            'error',
            {
                paths: [
                    {
                        name: 'react',
                        importNames: ['useImperativeHandle', 'forwardRef'],
                        message:
                            '🚫 IMPERATIVE PATTERNS FORBIDDEN: Use declarative props (isOpen, onClose) instead of imperative APIs (ref.open(), ref.close()). Components must be controlled via props only.'
                    }
                ]
            }
        ],
        'no-restricted-syntax': [
            'error',
            {
                selector: "Identifier[name='useImperativeHandle']",
                message:
                    '🚫 IMPERATIVE PATTERNS FORBIDDEN: useImperativeHandle creates imperative APIs. Use declarative props instead (e.g., isOpen={true} instead of ref.open()).'
            },
            {
                selector: "Identifier[name='forwardRef']",
                message:
                    '🚫 IMPERATIVE PATTERNS FORBIDDEN: forwardRef is typically used for imperative APIs. Use declarative props to control component state.'
            }
        ]
    },
    overrides: [
        {
            files: ['__tests__/**/*'],
            env: {
                jest: true
            }
        }
    ]
}
