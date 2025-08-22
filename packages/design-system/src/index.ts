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

export type { IComponentState, IStyleConfig, IThemeConfig } from './types/interfaces'

// Export utility types (legacy system)
export type { IGenericComponentVariants } from './utilities/generic-component-styles'

// Export legacy utilities for backward compatibility
export { colorUtils, generateValidationStyles } from './utilities/generic-component-styles'

// Export NEW Generic Style System (replaces old V2 system)
export {
    COMPONENT_STYLE_CONFIG,
    VISUAL_VARIANT_RULE,
    VariantRule,
    genericStyle
} from './utilities/generic-style'

export type {
    ComponentConfigType,
    ComponentType,
    ExtendedVisualVariantType,
    FieldOfViewType,
    HeaderPresetType,
    IClasses,
    IComponentAspect,
    IComponentStyleConfig,
    IComponentVariants,
    IHeaderStyle,
    IStyleStates,
    IStyleStatesConfig,
    ITypographyConfig,
    IVariantRule,
    IVisualVariantRules,
    ShadesType
} from './utilities/generic-style'

// Export Responsive Layout System
export type {
    FlexAlignementType,
    FlexDirectionType,
    IFieldLayout,
    IFieldLayouts,
    IFormLayoutConfig,
    IFieldLayouts as IFormLayoutVariants,
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
