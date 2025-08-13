import type { ComponentVariantType } from '../../../types'
import type { IComponentAspect } from '../interfaces/i-component-aspect'
import type { IStyleStatesConfig } from '../interfaces/i-style-states-config'
import type { ComponentType } from '../types/component-type.type'
import type { ExtendedVisualVariantType } from '../types/extended-visual-variant-type.type'

/**
 * Component style configuration interface
 */
export interface IComponentStyleConfig {
    prefix: string
    defaultVariant: ComponentVariantType
    defaultAspect: IComponentAspect
    defaultVisualVariantType: ExtendedVisualVariantType
    defaultStates: IStyleStatesConfig
}

/**
 * Component configuration mapping type
 */
export type ComponentConfigType = Record<ComponentType, IComponentStyleConfig>

/**
 * Default component style configurations
 */
export const COMPONENT_STYLE_CONFIG: ComponentConfigType = {
    button: {
        prefix: 'btn',
        defaultVariant: 'primary',
        defaultAspect: {
            rounded: false,
            borders: false,
            size: 'md',
            width: undefined,
            height: undefined
        },
        defaultVisualVariantType: 'solid',
        defaultStates: {
            hasHover: true,
            hasRing: true,
            hasFocused: true,
            hasPressed: true,
            hasDisable: true,
            hasErrors: true
        }
    },
    typography: {
        prefix: 'text',
        defaultVariant: 'primary',
        defaultAspect: {
            rounded: false,
            borders: false,
            size: 'md',
            width: undefined,
            height: undefined
        },
        defaultVisualVariantType: 'solid',
        defaultStates: {
            hasHover: false,
            hasRing: false,
            hasFocused: false,
            hasPressed: false,
            hasDisable: true,
            hasErrors: true
        }
    },
    input: {
        prefix: 'text',
        defaultVariant: 'primary',
        defaultAspect: {
            rounded: false,
            borders: false,
            size: 'md',
            width: undefined,
            height: undefined
        },
        defaultVisualVariantType: 'solid',
        defaultStates: {
            hasHover: false,
            hasRing: false,
            hasFocused: false,
            hasPressed: false,
            hasDisable: true,
            hasErrors: true
        }
    },
    accordion: {
        prefix: 'text',
        defaultVariant: 'primary',
        defaultAspect: {
            rounded: false,
            borders: false,
            size: 'md',
            width: undefined,
            height: undefined
        },
        defaultVisualVariantType: 'solid',
        defaultStates: {
            hasHover: false,
            hasRing: false,
            hasFocused: false,
            hasPressed: false,
            hasDisable: true,
            hasErrors: true
        }
    }
}
