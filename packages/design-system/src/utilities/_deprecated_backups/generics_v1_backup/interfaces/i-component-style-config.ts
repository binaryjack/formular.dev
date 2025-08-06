import type { ComponentSizeType, ComponentVariantType } from '../../../types'
import type { IComponentState } from '../../../types/interfaces'
import type { ExtendedVisualVariantType } from '../types/extended-visual-variant-type.type'

/**
 * Style generation configuration for each component type
 */
export interface IComponentStyleConfig {
    /** Base CSS class prefix (e.g., 'btn', 'input', 'card') */
    prefix: string
    /** Whether to include visual variants (solid, outline, ghost, link) */
    hasVisualVariants: boolean
    /** Whether to include color variants (primary, secondary, etc.) */
    hasColorVariants: boolean
    /** Whether to include size variants */
    hasSizeVariants: boolean
    /** Whether to include state classes */
    hasStateClasses: boolean
    /** Custom class patterns for special cases */
    customPatterns?: {
        base?: string
        size?: (size: ComponentSizeType) => string
        variant?: (variant: ComponentVariantType) => string
        visualVariant?: (visual: ExtendedVisualVariantType, color?: ComponentVariantType) => string
        state?: (state: keyof IComponentState) => string | null
    }
}
