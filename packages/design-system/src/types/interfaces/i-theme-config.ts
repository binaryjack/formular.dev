/**
 * Theme Config Interface
 *
 * Interface for design system theme configuration.
 */

import { spacing } from '../../tokens/spacing'
import type { ColorPaletteType } from '../types/color-palette.type'
import type { IStyleConfig } from './i-style-config'

export interface IThemeConfig {
    /** Color tokens */
    colors: ColorPaletteType
    /** Spacing tokens */
    spacing: typeof spacing
    /** Component style configurations */
    components?: Record<string, IStyleConfig>
}
