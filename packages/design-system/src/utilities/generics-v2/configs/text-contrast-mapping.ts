import type { ComponentVariantType } from '../../../types'
import type { ExtendedVisualVariantType } from '../../types/extended-visual-variant-type.type'

/**
 * Text Contrast Mapping for Visual Variants
 *
 * Provides intelligent text color defaults based on visual variant and component variant
 * to ensure proper contrast and readability.
 */

/**
 * Text contrast mapping for different visual variants
 * Key: VisualVariant, Value: Mapping of component variant to text variant
 */
export const VISUAL_VARIANT_TEXT_CONTRAST: Record<
    ExtendedVisualVariantType,
    Record<ComponentVariantType, ComponentVariantType>
> = {
    /**
     * SOLID: High contrast light text on colored backgrounds
     * Using specific light shades for maximum contrast
     */
    solid: {
        primary: 'neutral', // Blue background → Light neutral text (will use text-neutral-50)
        secondary: 'neutral', // Gray background → Light neutral text
        info: 'neutral', // Info background → Light neutral text
        danger: 'neutral', // Red background → Light neutral text
        success: 'neutral', // Green background → Light neutral text
        warning: 'secondary', // Yellow background → Dark secondary text (text-secondary-800)
        neutral: 'primary' // Light background → Dark primary text (text-primary-700)
    },

    /**
     * OUTLINE: Colored text matching the border on transparent background
     * These buttons have transparent backgrounds with colored borders
     */
    outline: {
        primary: 'primary', // Transparent background → Primary blue text
        secondary: 'secondary', // Transparent background → Secondary gray text
        info: 'info', // Transparent background → Info blue text
        danger: 'danger', // Transparent background → Danger red text
        success: 'success', // Transparent background → Success green text
        warning: 'warning', // Transparent background → Warning yellow/orange text
        neutral: 'neutral' // Transparent background → Neutral gray text
    },

    /**
     * GHOST: Subtle colored text on very light colored background
     * These buttons have very subtle backgrounds with colored text
     */
    ghost: {
        primary: 'primary', // Very light blue background → Primary text
        secondary: 'secondary', // Very light gray background → Secondary text
        info: 'info', // Very light blue background → Info text
        danger: 'danger', // Very light red background → Danger text
        success: 'success', // Very light green background → Success text
        warning: 'warning', // Very light yellow background → Warning text
        neutral: 'neutral' // Very light gray background → Neutral text
    },

    /**
     * LINK: Always colored text, no background
     * These buttons are text-only with hover effects
     */
    link: {
        primary: 'primary', // No background → Primary link color
        secondary: 'secondary', // No background → Secondary link color
        info: 'info', // No background → Info link color
        danger: 'danger', // No background → Danger link color
        success: 'success', // No background → Success link color
        warning: 'warning', // No background → Warning link color
        neutral: 'neutral' // No background → Neutral link color
    },

    /**
     * ELEVATED: Similar to solid but with shadow effects
     * These buttons have colored backgrounds with elevation shadows
     */
    elevated: {
        primary: 'neutral', // Blue elevated background → Light neutral text
        secondary: 'neutral', // Gray elevated background → Light neutral text
        info: 'neutral', // Info elevated background → Light neutral text
        danger: 'neutral', // Red elevated background → Light neutral text
        success: 'neutral', // Green elevated background → Light neutral text
        warning: 'secondary', // Yellow elevated background → Dark secondary text
        neutral: 'primary' // Light elevated background → Dark primary text
    },

    /**
     * OUTLINED: Alias for outline (backward compatibility)
     */
    outlined: {
        primary: 'primary',
        secondary: 'secondary',
        info: 'info',
        danger: 'danger',
        success: 'success',
        warning: 'warning',
        neutral: 'neutral'
    }
}

/**
 * Get intelligent text contrast color for a component
 *
 * @param visualVariant - The visual style of the component
 * @param componentVariant - The color variant of the component
 * @returns The appropriate text color variant for optimal contrast
 */
export const getTextContrastVariant = (
    visualVariant: ExtendedVisualVariantType,
    componentVariant: ComponentVariantType
): ComponentVariantType => {
    const mapping = VISUAL_VARIANT_TEXT_CONTRAST[visualVariant]
    if (!mapping) {
        // Fallback to outline mapping if visual variant not found
        return VISUAL_VARIANT_TEXT_CONTRAST.outline[componentVariant] || componentVariant
    }

    return mapping[componentVariant] || componentVariant
} /**
 * Component-specific text contrast overrides
 * Some components may need different contrast behavior
 */
export const COMPONENT_TEXT_OVERRIDES = {
    /**
     * Badges: Always high contrast since they're small
     */
    badge: {
        solid: {
            warning: 'secondary', // Better contrast than neutral on yellow badge
            neutral: 'secondary' // Better contrast than primary on light badge
        }
    },

    /**
     * Chips: Similar to badges but slightly more subtle
     */
    chip: {
        ghost: {
            // Ghost chips can use slightly more subtle text
            warning: 'warning', // Keep warning color even on ghost
            neutral: 'secondary' // Use secondary instead of neutral for better hierarchy
        }
    }
} as const
