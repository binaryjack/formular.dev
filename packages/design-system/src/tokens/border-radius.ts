/**
 * Design System Border Radius
 *
 * Border radius tokens for consistent component styling.
 * Based on modern design principles and existing formular.components styles.
 */

export const borderRadius = {
    none: '0px',
    xs: '0.125rem', // 2px
    sm: '0.25rem', // 4px
    md: '0.375rem', // 6px
    lg: '0.5rem', // 8px - matches CSS custom property --radius from formular.components
    xl: '0.75rem', // 12px
    '2xl': '1rem', // 16px
    '3xl': '1.5rem', // 24px
    full: '9999px'
} as const

// Component-specific border radius
export const componentBorderRadius = {
    field: borderRadius.lg, // 8px - matches existing --radius variable
    button: borderRadius.lg, // 8px
    card: borderRadius.lg, // 8px
    badge: borderRadius.full, // Full rounded
    avatar: borderRadius.full, // Full rounded
    modal: borderRadius.xl, // 12px
    dropdown: borderRadius.lg, // 8px
    tooltip: borderRadius.md // 6px
} as const

export type BorderRadius = typeof borderRadius
export type BorderRadiusKey = keyof BorderRadius
export type ComponentBorderRadius = typeof componentBorderRadius
