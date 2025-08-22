import type { ComponentVariantType } from '../../../../../types'
import { COMPONENT_STYLE_CONFIG } from '../../../config/component-style-config'
import type { HeaderPresetType } from '../../../interfaces/i-component-variants'
import type { IHeaderStyle } from '../../../interfaces/i-header-style'
import type { ComponentType } from '../../../types/component-type.type'

/**
 * Get header style configuration from preset name
 */
export const resolvePreset = function (
    this: any,
    componentType: ComponentType,
    presetName: HeaderPresetType,
    variant?: ComponentVariantType
): IHeaderStyle {
    const componentConfig = COMPONENT_STYLE_CONFIG[componentType]

    if (!componentConfig) {
        console.warn(`No configuration found for component type: ${componentType}`)
        return this.getDefaultHeaderStyle()
    }

    // Handle built-in presets
    switch (presetName) {
        case 'default':
            return this.getDefaultHeaderStyle()

        case 'dark-impact':
            return this.getDarkImpactStyle()

        case 'light-impact':
            return this.getLightImpactStyle()

        case 'branded':
            return this.getBrandedStyle(componentType, variant)

        case 'subtle':
            return this.getSubtleStyle()

        case 'custom':
            return {} // User provides full headerStyle

        default:
            // Check if it's a custom preset from COMPONENT_STYLE_CONFIG
            if (componentConfig.headerPresets?.[presetName]) {
                return componentConfig.headerPresets[presetName].style
            }

            console.warn(`Unknown header preset: ${presetName}`)
            return this.getDefaultHeaderStyle()
    }
}
