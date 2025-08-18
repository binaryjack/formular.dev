import type { EnhancedShadesType } from '../types/enhanced-shades-type.type'
import type { FieldOfViewType } from '../types/field-of-view-type.type'

/**
 * Maps semantic tokens to CSS class names
 */
export const mapSemanticTokenToClass = (
    fov: FieldOfViewType,
    shade: EnhancedShadesType,
    variant: string,
    prefix: string
): string => {
    // If it's a number, use the traditional shade-based approach
    if (typeof shade === 'number') {
        return `${prefix}-${variant}-${shade}`
    }

    // Handle semantic tokens
    switch (shade) {
        case 'variant-surface':
            return fov === 'back' ? `surface-variant-${variant}` : `${prefix}-${variant}-500`

        case 'variant-text':
            return fov === 'fore' ? `text-variant-${variant}` : `${prefix}-${variant}-600`

        case 'variant-text-on':
            return fov === 'fore' ? `text-on-variant-${variant}` : `${prefix}-${variant}-50`

        case 'variant-border':
            return fov === 'border' ? `border-variant-${variant}` : `${prefix}-${variant}-500`

        case 'surface-primary':
            return fov === 'back' ? 'bg-surface-primary' : `${prefix}-${variant}-50`

        case 'surface-secondary':
            return fov === 'back' ? 'bg-surface-secondary' : `${prefix}-${variant}-100`

        case 'text-primary':
            return fov === 'fore' ? 'text-primary' : `${prefix}-${variant}-900`

        case 'text-secondary':
            return fov === 'fore' ? 'text-secondary' : `${prefix}-${variant}-700`

        case 'smart':
            // Auto-select based on field of view
            if (fov === 'back') return `surface-variant-${variant}`
            if (fov === 'fore') return `text-on-variant-${variant}`
            if (fov === 'border') return `border-variant-${variant}`
            break

        default:
            // Fallback to traditional approach
            return `${prefix}-${variant}-500`
    }

    return `${prefix}-${variant}-500` // fallback
}
