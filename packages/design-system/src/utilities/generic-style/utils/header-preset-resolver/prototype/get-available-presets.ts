import { COMPONENT_STYLE_CONFIG } from '../../../config/component-style-config'
import type { ComponentType } from '../../../types/component-type.type'

/**
 * Get available presets for a component type
 */
export const getAvailablePresets = function (this: any, componentType: ComponentType): string[] {
    const componentConfig = COMPONENT_STYLE_CONFIG[componentType]
    const builtInPresets = ['default', 'dark-impact', 'light-impact', 'branded', 'subtle', 'custom']
    const customPresets = componentConfig?.headerPresets
        ? Object.keys(componentConfig.headerPresets)
        : []

    return [...builtInPresets, ...customPresets]
}
