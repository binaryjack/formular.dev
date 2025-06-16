module.exports = {
    semi: false,
    trailingComma: 'none',
    singleQuote: true,
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
    quoteProps: 'as-needed',
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: 'always',
    endOfLine: 'lf',
    overrides: [
        {
            files: ['*.json', '*.yaml', '*.yml'],
            options: {
                tabWidth: 2
            }
        },
        {
            files: ['*.md'],
            options: {
                printWidth: 80,
                proseWrap: 'always'
            }
        },
        {
            files: ['*.css', '*.scss'],
            options: {
                singleQuote: false
            }
        }
    ]
}
