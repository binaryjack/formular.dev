import { ComponentVariantType, ExtendedVisualVariantType } from '@/types'
import { IComponentAspect } from './i-component-aspect'
import { IStyleStatesConfig } from './i-style-states-config'
import { ITypographyConfig } from './i-typography-config'

/**
 * Header style configuration for fine-grained control
 * Used when headerPreset is 'custom' or for overriding preset behavior
 */
export interface IHeaderStyle {
    variant?: ComponentVariantType
    aspect?: IComponentAspect
    visualVariant?: ExtendedVisualVariantType
    states?: Partial<IStyleStatesConfig>
    typography?: ITypographyConfig

    // Fine-grained control options
    disableGenericText?: boolean // Prevent Typography from calling genericStyle
    forceBackgroundClasses?: string[] // Override background classes
    forceTextClasses?: string[] // Override text classes
    customClasses?: string[] // Additional custom classes

    // Advanced control
    preserveMode?: boolean // Keep light/dark mode behavior
    forceContrast?: 'high' | 'medium' | 'low' // Override contrast level
}
