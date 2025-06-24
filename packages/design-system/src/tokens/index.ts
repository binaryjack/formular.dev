/**
 * Design System Tokens
 *
 * Main export file for all design tokens.
 * Provides a comprehensive and consistent design language.
 */

export {
    animations,
    componentAnimations,
    type AnimationDuration,
    type AnimationEasing,
    type AnimationKeyframe,
    type AnimationPreset,
    type Animations
} from './animations'
export {
    borderRadius,
    componentBorderRadius,
    type BorderRadius,
    type BorderRadiusKey,
    type ComponentBorderRadius
} from './border-radius'
export {
    breakpoints,
    breakpointValues,
    mediaQueries,
    type Breakpoint,
    type BreakpointValue
} from './breakpoints'
export {
    colors,
    type ColorName,
    type ColorPalette,
    type ColorShade,
    type SemanticVariant
} from './colors'
export { shadows, type Shadow, type ShadowKey } from './shadows'
export {
    componentSpacing,
    spacing,
    type ComponentSpacing,
    type Spacing,
    type SpacingKey
} from './spacing'
export {
    typography,
    type FontFamily,
    type FontSize,
    type FontWeight,
    type TextTransform,
    type Typography
} from './typography'
export {
    componentZIndex,
    zIndex,
    type ComponentZIndex,
    type ZIndex,
    type ZIndexKey
} from './z-index'

// Import everything for the tokens object
import { animations, componentAnimations } from './animations'
import { borderRadius, componentBorderRadius } from './border-radius'
import { breakpoints, breakpointValues, mediaQueries } from './breakpoints'
import { colors } from './colors'
import { shadows } from './shadows'
import { componentSpacing, spacing } from './spacing'
import { typography } from './typography'
import { componentZIndex, zIndex } from './z-index'

// Re-export all tokens as a single object for convenience
export const tokens = {
    colors,
    typography,
    spacing,
    componentSpacing,
    breakpoints,
    breakpointValues,
    mediaQueries,
    shadows,
    borderRadius,
    componentBorderRadius,
    zIndex,
    componentZIndex,
    animations,
    componentAnimations
} as const

export type DesignTokens = typeof tokens
