import { COMPONENT_CONFIGS } from './component-configs'
import type { IComponentStyleConfig } from './interfaces/i-component-style-config'
import type { ComponentType } from './types/component-type.type'

/**
 * Get available component types
 */
export const getAvailableComponentTypes = (): ComponentType[] => {
    return Object.keys(COMPONENT_CONFIGS) as ComponentType[]
}

/**
 * Get configuration for a specific component type
 */
export const getComponentConfig = (
    componentType: ComponentType
): IComponentStyleConfig | undefined => {
    return COMPONENT_CONFIGS[componentType]
}

/**
 * Check if a component type supports a specific feature
 */
export const componentSupportsFeature = (
    componentType: ComponentType,
    feature: 'visualVariants' | 'colorVariants' | 'sizeVariants' | 'stateClasses'
): boolean => {
    const config = COMPONENT_CONFIGS[componentType]
    if (!config) return false

    switch (feature) {
        case 'visualVariants':
            return config.hasVisualVariants
        case 'colorVariants':
            return config.hasColorVariants
        case 'sizeVariants':
            return config.hasSizeVariants
        case 'stateClasses':
            return config.hasStateClasses
        default:
            return false
    }
}
