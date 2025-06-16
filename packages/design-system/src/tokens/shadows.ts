/**
 * Design System Shadows
 *
 * Shadow tokens for consistent depth and elevation.
 * Based on modern shadow principles and existing formular.components styles.
 */

export const shadows = {
    // Basic shadows
    none: 'none',
    xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',

    // Component-specific shadows
    field: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    'field-focus': '0 0 0 3px rgb(59 130 246 / 0.1)',
    'field-error': '0 0 0 3px rgb(239 68 68 / 0.1)',
    'field-success': '0 0 0 3px rgb(34 197 94 / 0.1)',
    'field-warning': '0 0 0 3px rgb(245 158 11 / 0.1)',

    // Button shadows
    'button-default': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    'button-hover': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    'button-pressed': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',

    // Card shadows
    'card-default': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    'card-hover': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',

    // Modal/Overlay shadows
    modal: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    overlay: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',

    // Dropdown shadows
    dropdown: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    tooltip: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
} as const

export type Shadow = typeof shadows
export type ShadowKey = keyof Shadow
