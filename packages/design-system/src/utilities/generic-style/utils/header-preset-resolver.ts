import type { ComponentVariantType } from '../../../types'
import { COMPONENT_STYLE_CONFIG } from '../config/component-style-config'
import type { HeaderPresetType } from '../interfaces/i-component-variants'
import type { IHeaderStyle } from '../interfaces/i-header-style'
import type { ComponentType } from '../types/component-type.type'

// Import prototype methods
import { getAvailablePresets } from './header-preset-resolver/prototype/get-available-presets'
import { getBrandedStyle } from './header-preset-resolver/prototype/get-branded-style'
import { getDarkImpactStyle } from './header-preset-resolver/prototype/get-dark-impact-style'
import { getDefaultHeaderStyle } from './header-preset-resolver/prototype/get-default-header-style'
import { getLightImpactStyle } from './header-preset-resolver/prototype/get-light-impact-style'
import { getPresetDescription } from './header-preset-resolver/prototype/get-preset-description'
import { getSubtleStyle } from './header-preset-resolver/prototype/get-subtle-style'
import { resolvePreset } from './header-preset-resolver/prototype/resolve-preset'

/**
 * Prototype-based header preset resolver constructor function
 * Resolves header preset configuration into a concrete IHeaderStyle
 */
export const HeaderPresetResolver = function (this: any) {
    // Constructor logic if needed
}

// Assign prototype methods following CONTRIBUTING.md guidelines
Object.assign(HeaderPresetResolver.prototype, {
    resolvePreset,
    getAvailablePresets,
    getPresetDescription,
    getDefaultHeaderStyle,
    getDarkImpactStyle,
    getLightImpactStyle,
    getBrandedStyle,
    getSubtleStyle
})

/**
 * Convenience function to resolve header configuration
 */
export function resolveHeaderConfig(
    componentType: ComponentType,
    headerPreset?: HeaderPresetType,
    headerStyle?: IHeaderStyle,
    variant?: ComponentVariantType
): IHeaderStyle {
    const resolver = new (HeaderPresetResolver as any)()

    // If explicit headerStyle is provided, use it (with preset as fallback for missing properties)
    if (headerStyle) {
        if (headerPreset && headerPreset !== 'custom') {
            const presetStyle = resolver.resolvePreset(componentType, headerPreset, variant)
            return { ...presetStyle, ...headerStyle } // headerStyle overrides preset
        }
        return headerStyle
    }

    // If only preset is provided, resolve it
    if (headerPreset) {
        return resolver.resolvePreset(componentType, headerPreset, variant)
    }

    // Default to 'branded' preset for components with header support
    const componentConfig = COMPONENT_STYLE_CONFIG[componentType]
    if (componentConfig?.headerPresets) {
        return resolver.resolvePreset(componentType, 'branded', variant)
    }

    // No header support - return empty config
    return resolver.resolvePreset(componentType, 'default', variant)
}
