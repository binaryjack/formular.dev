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

// Types for TypeScript support (export specific types to avoid conflicts)
export type {
    CSSCustomProperties,
    ColorVariant,
    ComponentState,
    ResponsiveValue,
    Size,
    SpacingSize,
    StyleConfig,
    StyleUtility,
    ThemeConfig,
    Variant
} from './types'

// CSS imports (for bundlers that support CSS imports)
import './styles/base.css'

// Version and metadata
export const version = '1.0.0'
export const name = 'formular.design.system'
