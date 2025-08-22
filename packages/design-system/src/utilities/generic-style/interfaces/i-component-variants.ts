import type { ComponentVariantType } from '../../../types'
import type { AppModeType } from '../types/app-mode-type.type'
import type { ComponentType } from '../types/component-type.type'
import type { ExtendedVisualVariantType } from '../types/extended-visual-variant-type.type'
import type { IComponentAspect } from './i-component-aspect'
import { IHeaderStyle } from './i-header-style'
import type { IStyleStatesConfig } from './i-style-states-config'
import type { ITypographyConfig } from './i-typography-config'

/**
 * Header preset types for common use cases
 */
export type HeaderPresetType =
    | 'default' // Inherits from main component variant
    | 'dark-impact' // Dark header with light text for visual impact
    | 'light-impact' // Light header with dark text for visual impact
    | 'branded' // Uses variant color with high contrast
    | 'subtle' // Minimal contrast, blends with container
    | 'custom' // Full manual control via headerStyle

/**
 * Main component variants configuration interface
 */
export interface IComponentVariants {
    componentTypes: ComponentType[]
    variant?: ComponentVariantType
    aspect?: IComponentAspect
    visualVariant?: ExtendedVisualVariantType
    states?: Partial<IStyleStatesConfig>
    typography?: ITypographyConfig
    mode?: AppModeType

    // NEW: Smart header control system
    headerPreset?: HeaderPresetType
    headerStyle?: IHeaderStyle
}
