import type { ComponentSizeType, ComponentVariantType } from '../../../types'
import type { IComponentState } from '../../../types/interfaces'
import type { ExtendedVisualVariantType } from '../../types/extended-visual-variant-type.type'
import type { ComponentTypeV2 } from '../types/component-type-v2.type'
import type { ITypographyConfig } from './i-typography-config'

/**
 * Generic Component Variants V2 - Experimental Implementation
 *
 * Key improvements:
 * - Required componentType field
 * - Separated typography from component styling
 * - All properties optional except componentType
 * - Intelligent defaults for unspecified values
 *
 * @example
 * ```typescript
 * // Simple usage with defaults
 * const classes = genericStyle({ componentType: 'button' })
 * // Result: "btn btn-primary btn-md text-md text-primary"
 *
 * // Complex independent styling
 * const classes = genericStyle({
 *   componentType: 'button',
 *   visualVariant: 'outline',
 *   variant: 'primary',
 *   size: '2xl',
 *   typography: {
 *     size: '2xs',
 *     variant: 'secondary',
 *     case: 'uppercase',
 *     weight: 'bold'
 *   }
 * })
 * // Result: "btn btn-outline btn-primary btn-2xl text-2xs text-secondary uppercase font-bold"
 * ```
 */
export interface IGenericComponentVariantsV2 {
    /** REQUIRED: Component type identifier */
    componentType: ComponentTypeV2

    // ===============================================
    // COMPONENT-SPECIFIC STYLING
    // ===============================================

    /** Component color variant (primary, secondary, info, danger, success, warning, neutral) */
    variant?: ComponentVariantType

    /** Component structural size (2xs, xs, sm, md, lg, xl, 2xl) */
    size?: ComponentSizeType

    /** Component visual style (solid, outline, ghost, link, elevated, outlined) */
    visualVariant?: ExtendedVisualVariantType

    /** Component interaction state */
    state?: IComponentState

    // ===============================================
    // TYPOGRAPHY STYLING (Independent from component)
    // ===============================================

    /** Typography configuration - independent from component properties */
    typography?: ITypographyConfig

    // ===============================================
    // UNIVERSAL PROPERTIES
    // ===============================================

    /** Border radius control (false = rounded-none) */
    rounded?: boolean

    /** Custom width override */
    width?: string

    /** Custom height override */
    height?: string

    /** Additional CSS classes */
    className?: string
}
