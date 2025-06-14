/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,css,html}'],
    theme: {
        extend: {
            screens: {
                '2xs': '0px',
                xs: '480px'
            },
            fontSize: {
                '2xs': '0.55rem'
            }
        }
    },
    plugins: []
}
