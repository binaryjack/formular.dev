/**
 * Generic Style System - New Atomic Implementation
 *
 * A unified component style generator with atomic design architecture.
 * This implementation provides:
 *
 * - Atomic styling with modular resolvers
 * - Clean separation of concerns
 * - Aligned with existing CSS classes
 * - TypeScript first approach
 * - Compatible with existing design system
 *
 * @example
 * ```typescript
 * import { genericStyling } from './generic-style'
 *
 * // Simple usage
 * const result = genericStyling('my-button', {
 *   mode: 'light',
 *   components: [{
 *     type: 'button',
 *     variant: 'primary',
 *     visualVariant: 'solid'
 *   }]
 * })
 * ```
 */

// Main atomic styling function export
export {
    genericStyling,
    type IBorderStyle,
    type IComponentPreset,
    type IComponentStyleConfig,
    type IGenericStyling
} from './utils/atomic-style-builder/generic-styling'

// Atomic system exports
export { COMPONENT_PRESET } from './utils/atomic-style-builder/presets/component-presets'
export {
    CONTRAST_RULE_DARK,
    CONTRAST_RULE_LIGHT,
    CONTRASTS
} from './utils/atomic-style-builder/presets/contrast-rules'

// Resolver exports
export { aspectResolver } from './utils/atomic-style-builder/resolvers/aspect-resolver'
export { borderResolver } from './utils/atomic-style-builder/resolvers/border-resolver'
export { colorResolver } from './utils/atomic-style-builder/resolvers/color-resolver'
export { componentResolver } from './utils/atomic-style-builder/resolvers/component-resolver'
export { contrastResolver } from './utils/atomic-style-builder/resolvers/contrast-resolver'
export { stateResolver } from './utils/atomic-style-builder/resolvers/state-resolver'
export { typographyResolver } from './utils/atomic-style-builder/resolvers/typography-resolver'
export { visualVariantResolver } from './utils/atomic-style-builder/resolvers/visual-variant-resolver'

// Interface exports
export type { IComponentAspect as IAtomicComponentAspect } from './utils/atomic-style-builder/interfaces/i-component-aspect'

// Legacy interface exports for backward compatibility
export type { IComponentAspect } from '../../types/interfaces/i-component-aspect'
export type { ITypographyConfig } from '../../types/interfaces/i-typography-config'
export type { IVisualVariantRule } from '../../types/interfaces/i-visual-variant-rule'
export type { IVisualVariantRules } from '../../types/interfaces/i-visual-variant-rules'

// Legacy type exports
export * from './types'
