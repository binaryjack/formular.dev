import type { ComponentSizeType, ComponentVariantType } from '../../../types'
import type { IComponentState } from '../../../types/interfaces'
import type { ExtendedVisualVariantType } from '../../types/extended-visual-variant-type.type'
import type { ComponentTypeV2 } from '../types/component-type-v2.type'
import type { ITypographyConfig } from './i-typography-config'

/**
 * Layered Style Output for Composite Components
 *
 * Separates styling responsibilities across component layers
 * to prevent conflicting CSS classes between composite components
 * like Button + Typography.
 */
export interface ILayeredStyleOutput {
    /** Classes for the container/frame component (e.g., button background, borders, sizing) */
    backgroundClasses: string

    /** Classes for the content/typography component (e.g., text color, font size, weight) */
    foregroundClasses: string

    /** Classes for interaction states (e.g., hover, focus, active) */
    interactionClasses: string

    /** Combined classes for backwards compatibility */
    combined: string
}

/**
 * Composite Component Variants Configuration
 *
 * Enables styling multiple components together while resolving
 * conflicts and maintaining design system consistency.
 *
 * @example
 * ```typescript
 * // Button with Typography
 * const styles = compositeStyle({
 *   componentTypes: ['button', 'typography'],
 *   variant: 'primary',
 *   visualVariant: 'solid',
 *   size: 'md',
 *   typography: {
 *     variant: 'neutral', // Override: use neutral text instead of primary
 *     size: 'sm'
 *   }
 * })
 *
 * // Usage:
 * // <button className={styles.backgroundClasses}>
 * //   <Typography className={styles.foregroundClasses}>Click me</Typography>
 * // </button>
 * ```
 */
export interface ICompositeComponentVariants {
    /** Array of component types that will be styled together */
    componentTypes: ComponentTypeV2[]

    // ===============================================
    // SHARED COMPONENT PROPERTIES
    // ===============================================

    /** Component color variant (applied to primary component) */
    variant?: ComponentVariantType

    /** Component structural size (applied to primary component) */
    size?: ComponentSizeType

    /** Component visual style (applied to primary component) */
    visualVariant?: ExtendedVisualVariantType

    /** Component interaction state */
    state?: IComponentState

    // ===============================================
    // TYPOGRAPHY OVERRIDES (for secondary components)
    // ===============================================

    /** Typography configuration - overrides smart contrast when specified */
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

    /** Additional CSS classes for background layer */
    backgroundClassName?: string

    /** Additional CSS classes for foreground layer */
    foregroundClassName?: string
}

/**
 * Component Layer Priority Configuration
 *
 * Defines which components contribute to which style layers
 * and their priority order for conflict resolution.
 */
export interface IComponentLayerConfig {
    /** Components that contribute background/container styles */
    backgroundComponents: ComponentTypeV2[]

    /** Components that contribute foreground/content styles */
    foregroundComponents: ComponentTypeV2[]

    /** Components that contribute interaction styles */
    interactionComponents: ComponentTypeV2[]
}

/**
 * Style Conflict Resolution Rules
 *
 * Defines how to resolve conflicts when multiple components
 * try to apply the same type of styling.
 */
export interface IStyleConflictResolution {
    /** Which component takes priority for text color */
    textColorPriority: ComponentTypeV2[]

    /** Which component takes priority for background color */
    backgroundColorPriority: ComponentTypeV2[]

    /** Which component takes priority for sizing */
    sizingPriority: ComponentTypeV2[]
}
