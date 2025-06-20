/**
 * Component Style Utilities
 *
 * Style utility functions for generating component classes.
 * These can be used by the formular.components library.
 */

import { animations } from '../tokens/animations'
import { colors } from '../tokens/colors'
import { spacing } from '../tokens/spacing'
import type { ColorVariant, ComponentState, Size, Variant } from '../types'

/**
 * Generate button style classes
 */
export const generateButtonStyles = (
    variant: Variant = 'solid',
    color: ColorVariant = 'primary',
    size: Size = 'md'
): string => {
    const baseClasses = 'btn-base'
    const sizeClasses = `btn-size-${size}`

    let variantClasses = ''
    switch (variant) {
        case 'solid':
            variantClasses = `btn-${color}`
            break
        case 'outline':
            variantClasses = `btn-outline-${color}`
            break
        case 'ghost':
            variantClasses = `btn-ghost-${color}`
            break
        case 'link':
            variantClasses = `btn-link-${color}`
            break
    }

    return `${baseClasses} ${sizeClasses} ${variantClasses}`.trim()
}

/**
 * Generate input style classes
 */
export const generateInputStyles = (size: Size = 'md', state?: ComponentState): string => {
    const baseClasses = 'input-base'
    const sizeClasses = `input-size-${size}`

    let stateClasses = 'input-default'
    if (state?.error) {
        stateClasses = 'input-error'
    } else if (state?.focused) {
        stateClasses = 'input-focused'
    } else if (state?.disabled) {
        stateClasses = 'input-disabled'
    }

    return `${baseClasses} ${sizeClasses} ${stateClasses}`.trim()
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
 * Generate card style classes
 */
export const generateCardStyles = (
    variant: 'default' | 'outlined' | 'elevated' = 'default'
): string => {
    const baseClasses = 'card-base'

    switch (variant) {
        case 'outlined':
            return `${baseClasses} card-outlined`
        case 'elevated':
            return `${baseClasses} card-elevated`
        default:
            return baseClasses
    }
}

/**
 * Generate focus ring classes
 */
export const generateFocusRing = (color: ColorVariant = 'primary'): string => {
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

/**
 * Size mapping utilities
 */
export const sizeMap = {
    xs: {
        padding: spacing[1],
        fontSize: 'text-2xs',
        height: '24px',
        iconSize: '12px'
    },
    sm: {
        padding: spacing[2],
        fontSize: 'text-sm',
        height: '32px',
        iconSize: '16px'
    },
    md: {
        padding: spacing[3],
        fontSize: 'text-base',
        height: '40px',
        iconSize: '20px'
    },
    lg: {
        padding: spacing[4],
        fontSize: 'text-lg',
        height: '48px',
        iconSize: '24px'
    },
    xl: {
        padding: spacing[6],
        fontSize: 'text-xl',
        height: '56px',
        iconSize: '28px'
    }
} as const

/**
 * Color utilities for generating dynamic styles
 */
export const colorUtils = {
    /**
     * Get color value by variant and shade
     */
    getColor: (variant: ColorVariant, shade: number = 500): string => {
        const colorPalette = colors[variant]
        if (typeof colorPalette === 'object') {
            return (colorPalette as Record<string, string>)[shade.toString()] || ''
        }
        return colorPalette || ''
    },

    /**
     * Generate CSS custom properties for colors
     */
    generateColorVars: (variant: ColorVariant): Record<string, string> => {
        const colorPalette = colors[variant]
        const vars: Record<string, string> = {}

        if (typeof colorPalette === 'object') {
            for (const [shade, value] of Object.entries(colorPalette)) {
                vars[`--color-${variant}-${shade}`] = value
            }
        }

        return vars
    }
}

/**
 * Animation utilities
 */
export const animationUtils = {
    /**
     * Get animation duration by speed
     */
    getDuration: (speed: keyof typeof animations.duration): string => {
        return animations.duration[speed]
    },

    /**
     * Get easing function
     */
    getEasing: (type: keyof typeof animations.easing): string => {
        return animations.easing[type]
    },

    /**
     * Create transition string
     */
    createTransition: (
        property: string = 'all',
        duration: keyof typeof animations.duration = 'normal',
        easing: keyof typeof animations.easing = 'easeOut'
    ): string => {
        return `${property} ${animations.duration[duration]} ${animations.easing[easing]}`
    }
}

/**
 * Responsive utilities
 */
export const responsiveUtils = {
    /**
     * Generate responsive classes
     */
    generateResponsive: (baseClass: string, breakpoints: Record<string, string>): string => {
        let classes = baseClass

        for (const [breakpoint, value] of Object.entries(breakpoints)) {
            if (breakpoint !== 'base') {
                classes += ` ${breakpoint}:${value}`
            }
        }

        return classes
    }
}

/**
 * Spacing utilities
 */
export const spacingUtils = {
    /**
     * Get spacing value by key
     */
    getSpacing: (key: keyof typeof spacing): string => {
        return spacing[key]
    },

    /**
     * Generate padding classes
     */
    generatePadding: (size: Size): string => {
        const paddingMap = {
            xs: 'p-1',
            sm: 'p-2',
            md: 'p-3',
            lg: 'p-4',
            xl: 'p-6'
        }
        return paddingMap[size]
    },

    /**
     * Generate margin classes
     */
    generateMargin: (size: Size): string => {
        const marginMap = {
            xs: 'm-1',
            sm: 'm-2',
            md: 'm-3',
            lg: 'm-4',
            xl: 'm-6'
        }
        return marginMap[size]
    }
}
