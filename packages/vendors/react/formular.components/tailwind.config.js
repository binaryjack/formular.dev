/** @type {import('tailwindcss').Config} */
const designSystemConfig = require('formular.design.system/tailwind-config')

module.exports = {
    // Extend the design system config
    ...designSystemConfig,
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx,css,html}',
        // Include design system content patterns
        '../../../design-system/src/**/*.{js,jsx,ts,tsx}'
    ]
}
