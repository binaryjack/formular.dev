import type { ComponentVariantType } from '../../../types'
import type { AppModeType } from '../types/app-mode-type.type'
import type { ComponentType } from '../types/component-type.type'
import type { ExtendedVisualVariantType } from '../types/extended-visual-variant-type.type'
import type { IComponentAspect } from './i-component-aspect'
import type { IStyleStatesConfig } from './i-style-states-config'
import type { ITypographyConfig } from './i-typography-config'

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
    backgroundClassName?: string
    foregroundClassName?: string
    mode?: AppModeType
}
