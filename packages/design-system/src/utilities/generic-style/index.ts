/**
 * Generic Style System - New Implementation
 *
 * A unified component style generator with clean architecture.
 * This implementation provides:
 *
 * - Single unified API via genericStyle()
 * - Separated concerns with proper TypeScript structure
 * - Follows project CONTRIBUTING.md guidelines
 * - Maximum flexibility with intelligent defaults
 *
 * @example
 * ```typescript
 * import { genericStyle } from './generic-style'
 *
 * // Simple usage
 * const classes = genericStyle({
 *   componentTypes: ['button'],
 *   variant: 'primary'
 * })
 *
 * // Complex usage with typography
 * const classes = genericStyle({
 *   componentTypes: ['button'],
 *   variant: 'primary',
 *   visualVariant: 'solid',
 *   typography: { size: '2xs', variant: 'secondary' }
 * })
 * ```
 */

// Main function export
export {
    EnhancedVariantRule,
    SEMANTIC_VISUAL_VARIANT_RULE,
    VISUAL_VARIANT_RULE,
    VariantRule,
    genericStyle,
    semanticStyle
} from './generic-style'

// Configuration exports
export { COMPONENT_STYLE_CONFIG } from './config/component-style-config'
export type { ComponentConfigType, IComponentStyleConfig } from './config/component-style-config'

// Interface exports
export type { IClasses } from './interfaces/i-classes'
export type { IComponentAspect } from './interfaces/i-component-aspect'
export type { IComponentVariants } from './interfaces/i-component-variants'
export type { IEnhancedVariantRule } from './interfaces/i-enhanced-variant-rule'
export type { ISemanticVisualVariantRules } from './interfaces/i-semantic-visual-variant-rules'
export type { IStyleStates } from './interfaces/i-style-states'
export type { IStyleStatesConfig } from './interfaces/i-style-states-config'
export type { ITypographyConfig } from './interfaces/i-typography-config'
export type { IVariantRule } from './interfaces/i-variant-rule'
export type { IVisualVariantRules } from './interfaces/i-visual-variant-rules'

// Re-export types
export * from './types'
