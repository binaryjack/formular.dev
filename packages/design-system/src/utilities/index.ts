/**
 * Design System Utility Functions
 *
 * Utility functions for working with design tokens and creating consistent styles.
 */

// Type definitions for class value handling
export type ClassValue =
    | string
    | number
    | boolean
    | undefined
    | null
    | { [key: string]: boolean | undefined | null }
    | ClassValue[]

import { colors } from '../tokens/colors'
import { shadows } from '../tokens/shadows'
import { spacing } from '../tokens/spacing'

// Export generic component style utilities from generics folder
export * from './generics'

/**
 * Simple class name utility (lightweight alternative to clsx)
 * Combines class names and handles conditional classes
 *
 * @param inputs - Class names or conditional class objects
 * @returns Combined class string
 */
export const cx = (...inputs: ClassValue[]): string => {
    const classes: string[] = []

    for (const input of inputs) {
        if (!input) continue

        if (typeof input === 'string' || typeof input === 'number') {
            classes.push(String(input))
        } else if (Array.isArray(input)) {
            const result = cx(...input)
            if (result) classes.push(result)
        } else if (typeof input === 'object') {
            for (const [key, value] of Object.entries(input)) {
                if (value) classes.push(key)
            }
        }
    }

    return classes.join(' ')
}

/**
 * Combines class names (using cx for now, can be upgraded to use tailwind-merge when available)
 *
 * @param inputs - Class names or conditional class objects
 * @returns Merged class string
 */
export const cn = (...inputs: ClassValue[]) => {
    return cx(...inputs)
}

/**
 * Gets a color value by name and shade
 *
 * @param colorName - The color name (e.g., 'primary', 'secondary')
 * @param shade - The color shade (e.g., '500', '600')
 * @returns The color value or undefined if not found
 */
export const getColor = (colorName: keyof typeof colors, shade: string) => {
    const color = colors[colorName]
    if (typeof color === 'object' && color !== null) {
        return (color as Record<string, string>)[shade]
    }
    return color
}

/**
 * Gets a spacing value by key
 *
 * @param spacingKey - The spacing key (e.g., '4', '8', '12')
 * @returns The spacing value or undefined if not found
 */
export const getSpacing = (spacingKey: keyof typeof spacing) => {
    return spacing[spacingKey]
}

/**
 * Gets a shadow value by key
 *
 * @param shadowKey - The shadow key (e.g., 'sm', 'md', 'lg')
 * @returns The shadow value or undefined if not found
 */
export const getShadow = (shadowKey: keyof typeof shadows) => {
    return shadows[shadowKey]
}

/**
 * Creates a CSS custom property name
 *
 * @param name - The property name
 * @returns CSS custom property string
 */
export const cssVar = (name: string) => {
    return `var(--${name})`
}

/**
 * Creates CSS custom properties object from design tokens
 * Useful for injecting design tokens into CSS-in-JS or inline styles
 *
 * @param tokens - Object of token key-value pairs
 * @returns Object with CSS custom property keys
 */
export const createCssVars = (tokens: Record<string, string | number>): Record<string, string> => {
    const result: Record<string, string> = {}
    for (const key in tokens) {
        if (tokens.hasOwnProperty(key)) {
            result[`--${key}`] = String(tokens[key])
        }
    }
    return result
}

/**
 * Responsive value utility
 * Helps create responsive styles with breakpoint-specific values
 *
 * @param values - Object with breakpoint keys and values
 * @returns Object suitable for CSS-in-JS responsive styles
 */
export const responsive = (values: Record<string, string | number>) => {
    return values
}

/**
 * Creates a variant style object
 * Useful for component variants with different styling
 *
 * @param variant - The variant name
 * @param variants - Object mapping variant names to styles
 * @returns The style object for the variant
 */
export const getVariant = <T>(variant: string, variants: Record<string, T>): T | undefined => {
    return variants[variant]
}

/**
 * Creates size-based utility classes
 * Common pattern for component sizing
 *
 * @param size - ComponentSizeType key (e.g., 'sm', 'md', 'lg')
 * @param sizeMap - Mapping of sizes to class names or styles
 * @returns The classes or styles for the size
 */
export const getSize = <T>(size: string, sizeMap: Record<string, T>): T | undefined => {
    return sizeMap[size]
}

/**
 * Focus ring utility
 * Creates consistent focus styling across components
 *
 * @param color - Focus ring color (defaults to primary)
 * @returns Focus ring classes
 */
export const focusRing = (color: string = 'primary') => {
    return `focus:outline-none focus:ring-2 focus:ring-${color}-500 focus:ring-offset-2`
}

/**
 * Screen reader only utility
 * Hides content visually but keeps it accessible to screen readers
 *
 * @returns Screen reader only classes
 */
export const srOnly = () => {
    return 'sr-only'
}

/**
 * Truncate text utility
 * Adds text truncation with ellipsis
 *
 * @returns Text truncation classes
 */
export const truncate = () => {
    return 'truncate'
}
