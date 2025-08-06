import { animations } from '../../tokens/animations'
import { colors } from '../../tokens/colors'
import { spacing } from '../../tokens/spacing'
import type { ComponentSizeType, ComponentVariantType } from '../../types'

/**
 * ComponentSizeType mapping utilities
 */
export const sizeMap = {
    '2xs': {
        padding: spacing[0.5],
        fontSize: 'text-2xs',
        height: '20px',
        iconSize: '10px'
    },
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
    },
    '2xl': {
        padding: spacing[8],
        fontSize: 'text-2xl',
        height: '64px',
        iconSize: '32px'
    }
} as const

/**
 * Color utilities for generating dynamic styles
 */
export const colorUtils = {
    /**
     * Get color value by variant and shade
     */
    getColor: (variant: ComponentVariantType, shade: number = 500): string => {
        const colorPalette = colors[variant]
        if (typeof colorPalette === 'object') {
            return (colorPalette as Record<string, string>)[shade.toString()] || ''
        }
        return colorPalette || ''
    },

    /**
     * Generate CSS custom properties for colors
     */
    generateColorVars: (variant: ComponentVariantType): Record<string, string> => {
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
    generatePadding: (size: ComponentSizeType): string => {
        const paddingMap = {
            '2xs': 'p-0.5',
            xs: 'p-1',
            sm: 'p-2',
            md: 'p-3',
            lg: 'p-4',
            xl: 'p-6',
            '2xl': 'p-8',
            '3xl': 'p-12'
        }
        return paddingMap[size] || paddingMap.md
    },

    /**
     * Generate margin classes
     */
    generateMargin: (size: ComponentSizeType): string => {
        const marginMap = {
            '2xs': 'm-0.5',
            xs: 'm-1',
            sm: 'm-2',
            md: 'm-3',
            lg: 'm-4',
            xl: 'm-6',
            '2xl': 'm-8',
            '3xl': 'm-12'
        }
        return marginMap[size] || marginMap.md
    }
}
