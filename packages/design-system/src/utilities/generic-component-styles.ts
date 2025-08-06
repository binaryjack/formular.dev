/**
 * @deprecated This file is deprecated. Use individual imports from './generics/' instead.
 *
 * This file exists for backward compatibility only.
 * All functionality has been moved to the './generics/' folder with proper separation of concerns.
 *
 * @example
 * Instead of:
 * ```typescript
 * import { generateComponentStyles } from './generic-component-styles'
 * ```
 *
 * Use:
 * ```typescript
 * import { generateComponentStyles } from './generics'
 * // or more specific imports:
 * import { generateComponentStyles } from './generics/generate-component-styles'
 * import { generateButtonStyles } from './generics/button-api'
 * ```
 */

// Re-export everything from generics for backward compatibility
export {
    animationUtils,
    colorUtils,
    COMPONENT_CONFIGS,
    componentSupportsFeature,
    createComponentCSSVars,
    // Style generators
    createComponentStyleGenerator,
    generateButtonComponentStyles,
    // Specialized utilities
    generateButtonRippleStyles,
    // Developer-friendly button API
    generateButtonStyles,
    generateCardComponentStyles,
    generateCardStyles,
    generateCheckboxComponentStyles,
    // Core functionality
    generateComponentStyles,
    generateDisabledStyles,
    generateFieldStyles,
    generateFocusRing,
    generateInputComponentStyles,
    generateInputStyles,
    generateLoadingStyles,
    generateRadioComponentStyles,
    generateSwitchComponentStyles,
    generateTextComponentStyles,
    generateTypographyComponentStyles,
    generateValidationStyles,
    // Utility functions
    getAvailableComponentTypes,
    getComponentConfig,
    responsiveUtils,
    // Design utilities
    sizeMap,
    spacingUtils
} from './generics'

// Re-export types and interfaces
export type {
    ComponentType,
    ExtendedVisualVariantType,
    IButtonVariants,
    IComponentStyleConfig,
    IGenericComponentVariants
} from './generics'
