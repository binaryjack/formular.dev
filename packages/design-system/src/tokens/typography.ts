/**
 * Design System Typography
 *
 * Typography tokens including font families, sizes, weights, and line heights.
 * Based on existing formular.components styles and modern typography scales.
 */

export const typography = {
    // Font families
    fontFamily: {
        sans: [
            'Inter',
            'ui-sans-serif',
            'system-ui',
            '-apple-system',
            'BlinkMacSystemFont',
            'Segoe UI',
            'Roboto',
            'Helvetica Neue',
            'Arial',
            'Noto Sans',
            'sans-serif'
        ],
        serif: ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        mono: [
            'ui-monospace',
            'SFMono-Regular',
            'Menlo',
            'Monaco',
            'Consolas',
            'Liberation Mono',
            'Courier New',
            'monospace'
        ]
    },

    // Font sizes (based on existing custom sizes from formular.components)
    fontSize: {
        '2xs': { value: '0.55rem', lineHeight: '0.75rem' }, // text-04 equivalent
        xs: { value: '0.75rem', lineHeight: '1rem' }, // text-08 equivalent
        sm: { value: '0.875rem', lineHeight: '1.25rem' },
        base: { value: '1rem', lineHeight: '1.5rem' }, // text-10 equivalent
        lg: { value: '1.125rem', lineHeight: '1.75rem' }, // text-115 equivalent
        xl: { value: '1.25rem', lineHeight: '1.75rem' },
        '2xl': { value: '1.5rem', lineHeight: '2rem' }, // text-135 equivalent
        '3xl': { value: '1.875rem', lineHeight: '2.25rem' }, // text-165 equivalent
        '4xl': { value: '2.25rem', lineHeight: '2.5rem' }, // text-200 equivalent
        '5xl': { value: '3rem', lineHeight: '1' },
        '6xl': { value: '3.75rem', lineHeight: '1' },
        '7xl': { value: '4.5rem', lineHeight: '1' },
        '8xl': { value: '6rem', lineHeight: '1' },
        '9xl': { value: '8rem', lineHeight: '1' }
    },

    // Font weights
    fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900'
    },

    // Line heights
    lineHeight: {
        none: '1',
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2'
    },

    // Letter spacing
    letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em'
    }, // Text decoration
    textDecoration: {
        none: 'none',
        underline: 'underline',
        overline: 'overline',
        'line-through': 'line-through'
    },

    // Text transform (case)
    textTransform: {
        none: 'none',
        capitalize: 'capitalize',
        uppercase: 'uppercase',
        lowercase: 'lowercase'
    }
} as const

export type Typography = typeof typography
export type FontFamily = keyof Typography['fontFamily']
export type FontSize = keyof Typography['fontSize']
export type FontWeight = keyof Typography['fontWeight']
export type TextTransform = keyof Typography['textTransform']
