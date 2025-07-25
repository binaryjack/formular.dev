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

// Component types
export * from './components'

// Utilities and style helpers
export * from './utilities'

// Types for TypeScript support (export specific types to avoid conflicts)
export type {
    CSSCustomProperties,
    CSSCustomPropertiesType,
    ColorPaletteType,
    // Legacy aliases (deprecated)
    ColorVariant,
    ComponentSizeType,
    ComponentState,
    ComponentVariantType,
    ElementPositionType,
    // Interfaces
    IComponentState,
    IStyleConfig,
    IThemeConfig,
    OrientationType,
    ResponsiveValue,
    ResponsiveValueType,
    ScreenOrientationType,
    Size,
    SpacingSize,
    SpacingSizeType,
    StyleConfig,
    StyleUtility,
    StyleUtilityType,
    TextCaseType,
    TextWeightType,
    ThemeConfig,
    ValueOf,
    ValueOfType,
    Variant,
    VariantNameType,
    VisualVariantType
} from './types/index'

// Export constants
export { DrawerBreakPointSizes } from './types/index'

// CSS imports (for bundlers that support CSS imports)
import './styles/index.css'

// Version and metadata
export const version = '1.0.0'
export const name = 'formular.design.system'
