import { COMPONENT_STYLE_CONFIG } from '../../../config/component-style-config'
import type { ComponentType } from '../../../types/component-type.type'

/**
 * Get preset description for documentation/tooltips
 */
export const getPresetDescription = function (
    this: any,
    componentType: ComponentType,
    presetName: string
): string {
    const componentConfig = COMPONENT_STYLE_CONFIG[componentType]

    // Built-in preset descriptions
    const builtInDescriptions: Record<string, string> = {
        default: 'Inherits styling from main component variant',
        'dark-impact': 'Dark header with light text for maximum visual impact',
        'light-impact': 'Light header with dark text for clean appearance',
        branded: 'Uses component variant colors with proper contrast',
        subtle: 'Minimal contrast that blends with container',
        custom: 'Full manual control via headerStyle property'
    }

    if (builtInDescriptions[presetName]) {
        return builtInDescriptions[presetName]
    }

    // Custom preset description
    if (componentConfig?.headerPresets?.[presetName]) {
        return componentConfig.headerPresets[presetName].description
    }

    return 'Unknown preset'
}
