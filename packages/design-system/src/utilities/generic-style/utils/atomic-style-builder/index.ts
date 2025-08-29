/**
 * Atomic Style Builder - New Generation Styling System
 *
 * This is the new atomic approach to component styling that replaces
 * the old genericStyle system with a more modular and flexible approach.
 */

// Main function export
export { genericStyling } from './generic-styling'

// Interface exports
export type {
    IBorderStyle,
    IComponentPreset,
    IComponentStyleConfig,
    IGenericStyling as IGenericStylingBase
} from './generic-styling'

export type { IComponentAspect as IAtomicComponentAspect } from './interfaces/i-component-aspect'

// Helper function exports
export { VisualVariantRule } from './helpers/visual-variant-rule'

// Preset exports
export { COMPONENT_PRESET } from './presets/component-presets'

// Resolver exports for advanced usage
export { aspectResolver } from './resolvers/aspect-resolver'
export { borderResolver } from './resolvers/border-resolver'
export { caseResolver } from './resolvers/case-resolver'
export { componentResolver } from './resolvers/component-resolver'
export { stateResolver } from './resolvers/state-resolver'
export { textSizeResolver } from './resolvers/text-size-resolver'
export { typographyResolver } from './resolvers/typography-resolver'
export { visualVariantResolver } from './resolvers/visual-variant-resolver'
export { weightResolver } from './resolvers/weight-resolver'
