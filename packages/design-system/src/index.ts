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

// Export constants
export { DrawerBreakPointSizes } from './types/utilities'

// CSS imports (for bundlers that support CSS imports)
import './styles/index.css'

// Version and metadata
export const version = '1.0.0'
export const name = 'formular.design.system'
