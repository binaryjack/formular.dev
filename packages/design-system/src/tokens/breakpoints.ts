/**
 * Design System Breakpoints
 *
 * Responsive breakpoint tokens for consistent layout across devices.
 * Based on existing formular.components responsive configuration.
 */

export const breakpoints = {
    // Custom breakpoints matching formular.components config
    '2xs': '0px', // Extra small devices (portrait phones, < 480px)
    xs: '480px', // Small devices (landscape phones, >= 480px)
    sm: '640px', // Small devices (large phones, small tablets, >= 640px)
    md: '768px', // Medium devices (tablets, >= 768px)
    lg: '1024px', // Large devices (desktops, >= 1024px)
    xl: '1280px', // Extra large devices (large desktops, >= 1280px)
    '2xl': '1536px' // Extra extra large devices (>= 1536px)
} as const

// Breakpoint utilities for JavaScript usage
export const breakpointValues = {
    '2xs': 0,
    xs: 480,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
} as const

// Media query helpers
export const mediaQueries = {
    '2xs': `(min-width: ${breakpoints['2xs']})`,
    xs: `(min-width: ${breakpoints.xs})`,
    sm: `(min-width: ${breakpoints.sm})`,
    md: `(min-width: ${breakpoints.md})`,
    lg: `(min-width: ${breakpoints.lg})`,
    xl: `(min-width: ${breakpoints.xl})`,
    '2xl': `(min-width: ${breakpoints['2xl']})`
} as const

export type Breakpoint = keyof typeof breakpoints
export type BreakpointValue = (typeof breakpointValues)[Breakpoint]
