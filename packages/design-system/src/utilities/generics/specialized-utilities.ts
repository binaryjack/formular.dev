import type { ComponentVariantType } from '../../types'

/**
 * Generate button ripple style classes
 */
export const generateButtonRippleStyles = (color: ComponentVariantType = 'primary'): string => {
    return `btn-ripple-${color}`
}

/**
 * Generate validation message classes
 */
export const generateValidationStyles = (
    type: 'error' | 'success' | 'warning' | 'info'
): string => {
    switch (type) {
        case 'error':
            return 'field-error-text validation-error'
        case 'success':
            return 'field-success-text validation-success'
        case 'warning':
            return 'field-warning-text validation-warning'
        case 'info':
            return 'field-info-text validation-info'
        default:
            return 'field-helper-text'
    }
}

/**
 * Generate field container classes
 */
export const generateFieldStyles = (hasError?: boolean, hasSuccess?: boolean): string => {
    let classes = 'field-container'

    if (hasError) {
        classes += ' field-error'
    } else if (hasSuccess) {
        classes += ' field-success'
    }

    return classes
}

/**
 * Generate focus ring classes
 */
export const generateFocusRing = (color: ComponentVariantType = 'primary'): string => {
    return `focus-ring-${color}`
}

/**
 * Generate loading state classes
 */
export const generateLoadingStyles = (): string => {
    return 'state-loading'
}

/**
 * Generate disabled state classes
 */
export const generateDisabledStyles = (): string => {
    return 'state-disabled'
}

/**
 * Create CSS custom properties for a component
 */
export const createComponentCSSVars = (
    componentName: string,
    tokens: Record<string, string | number>
): Record<string, string> => {
    const cssVars: Record<string, string> = {}

    for (const [key, value] of Object.entries(tokens)) {
        cssVars[`--${componentName}-${key}`] = String(value)
    }

    return cssVars
}
