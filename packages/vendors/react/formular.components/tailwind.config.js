/** @type {import('tailwindcss').Config} */
const path = require('path')

// Import design system config directly from the relative path
const designSystemConfig = require('../../../design-system/tailwind.config.js')

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
