/**
 * Generic Style System V2 - Experimental Implementation
 *
 * A unified component style generator with separated typography concerns.
 * This experimental version provides:
 *
 * - Single unified API via genericStyle()
 * - Complete separation of component vs typography styling
 * - Intelligent defaults with maximum flexibility
 * - TypeScript-first design with full autocomplete
 *
 * @example
 * ```typescript
 * import { genericStyle } from './generics-v2'
 *
 * // Simple usage
 * const classes = genericStyle({ componentType: 'button' })
 *
 * // Complex usage
 * const classes = genericStyle({
 *   componentType: 'button',
 *   variant: 'primary',
 *   size: '2xl',
 *   typography: { size: '2xs', variant: 'secondary' }
 * })
 * ```
 */

// Main function export
export {
    componentSupportsFeatureV2,
    genericStyle,
    getAvailableComponentTypesV2
} from './generic-style-generator-v2'

// Composite style generator
export { compositeStyle } from './composite-style-generator'

// Type exports
export type { IComponentStyleConfigV2 } from './configs/component-configs-v2'
export type { IGenericComponentVariantsV2 } from './interfaces/i-generic-component-variants-v2'
export type { ITypographyConfig } from './interfaces/i-typography-config'
export type { ComponentTypeV2 } from './types/component-type-v2.type'

// Composite types
export type {
    ICompositeComponentVariants,
    ILayeredStyleOutput
} from './interfaces/i-composite-component-variants'

// Configuration exports (for advanced usage)
export { COMPONENT_CONFIGS_V2 } from './configs/component-configs-v2'
