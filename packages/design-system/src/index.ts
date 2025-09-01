/**
 * FORMULAR Design System
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * A comprehensive design system with TailwindCSS supporting the formular.components library.
 * This package provides design tokens, utilities, and styles - no components.
 */

// Design tokens
export * from './tokens'

// Utilities and style helpers
export * from './utilities'

// Note: Component implementations are in framework-specific packages (react, vue, etc.)
// This package only provides CSS styles and design tokens

// Types for TypeScript support (export specific types to avoid conflicts)
export type {
    CSSCustomPropertiesType,
    ColorPaletteType,
    ComponentSizeType,
    ComponentVariantType,
    ElementPositionType,
    OrientationType,
    ResponsiveValueType,
    ScreenOrientationType,
    SpacingSizeTypeType,
    StyleUtilityType,
    TextCaseType,
    TextWeightType,
    ValueOfType,
    VisualVariantType
} from './types/types'

export type { IThemeConfig } from './types/interfaces'

// Export utility types
export type { IGenericComponentVariants } from './utilities/generate-validation-styles'

// Export component variant interfaces
export type {
    HeaderPresetType,
    IComponentVariants
} from './utilities/generic-style/interfaces/i-component-variants'
export type { IHeaderStyle } from './utilities/generic-style/interfaces/i-header-style'

// Export utilities
export { colorUtils, generateValidationStyles } from './utilities/generate-validation-styles'

// Export Atomic Style System
export {
    COMPONENT_PRESET,
    aspectResolver,
    borderResolver,
    componentResolver,
    genericStyling,
    stateResolver,
    typographyResolver,
    visualVariantResolver
} from './utilities/generic-style'

// Export genericStyle alias for component compatibility
export { genericStyling as genericStyle } from './utilities/generic-style'

export type {
    IAtomicComponentAspect,
    IBorderStyle,
    IComponentPreset,
    IComponentStyleConfig
} from './utilities/generic-style'

// Export additional interface types
export type {
    IComponentAspect,
    ITypographyConfig,
    IVisualVariantRule,
    IVisualVariantRules
} from './utilities/generic-style'

// Export Responsive Layout System
export type {
    FlexAlignementType,
    FlexDirectionType,
    IFieldLayout,
    IFieldLayouts,
    IFormLayoutConfig,
    IFormLayoutVariants,
    ILayoutClasses,
    LayoutType,
    OffsetType,
    ResponsiveFormLayoutType
} from './utilities'

export { generateFlexLayoutClasses, generateLayoutClasses } from './utilities'

// Export constants
export { DrawerBreakPointSizes, rippleColors } from './types/utilities'

// CSS imports (for bundlers that support CSS imports)
import './styles/index.css'

// Version and metadata
export const version = '1.0.0'
export const name = 'formular.design.system'
