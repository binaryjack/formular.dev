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
        prefix: 'input',
        defaultVariant: 'primary',
        defaultAspect: {
            rounded: false,
            borders: true,
            size: 'md',
            width: undefined,
            height: undefined
        },
        defaultVisualVariantType: 'outline',
        defaultStates: {
            hasHover: true,
            hasRing: true,
            hasFocused: true,
            hasPressed: false,
            hasDisable: true,
            hasErrors: true
        }
    },
    accordion: {
        prefix: 'accordion',
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
            hasRing: false,
            hasFocused: false,
            hasPressed: false,
            hasDisable: true,
            hasErrors: true
        }
    },
    card: {
        prefix: 'card',
        defaultVariant: 'neutral',
        defaultAspect: {
            rounded: true,
            borders: true,
            size: 'md',
            width: undefined,
            height: undefined
        },
        defaultVisualVariantType: 'elevated',
        defaultStates: {
            hasHover: true,
            hasRing: false,
            hasFocused: false,
            hasPressed: false,
            hasDisable: false,
            hasErrors: false
        }
    },
    field: {
        prefix: 'field',
        defaultVariant: 'neutral',
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
            hasDisable: false,
            hasErrors: true
        }
    },
    switch: {
        prefix: 'switch',
        defaultVariant: 'primary',
        defaultAspect: {
            rounded: true,
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
            hasPressed: false,
            hasDisable: true,
            hasErrors: false
        }
    },
    checkbox: {
        prefix: 'checkbox',
        defaultVariant: 'primary',
        defaultAspect: {
            rounded: false,
            borders: true,
            size: 'md',
            width: undefined,
            height: undefined
        },
        defaultVisualVariantType: 'outline',
        defaultStates: {
            hasHover: true,
            hasRing: true,
            hasFocused: true,
            hasPressed: false,
            hasDisable: true,
            hasErrors: false
        }
    },
    radio: {
        prefix: 'radio',
        defaultVariant: 'primary',
        defaultAspect: {
            rounded: true,
            borders: true,
            size: 'md',
            width: undefined,
            height: undefined
        },
        defaultVisualVariantType: 'outline',
        defaultStates: {
            hasHover: true,
            hasRing: true,
            hasFocused: true,
            hasPressed: false,
            hasDisable: true,
            hasErrors: false
        }
    },
    drawer: {
        prefix: 'drawer',
        defaultVariant: 'neutral',
        defaultAspect: {
            rounded: false,
            borders: true,
            size: 'md',
            width: undefined,
            height: undefined
        },
        defaultVisualVariantType: 'elevated',
        defaultStates: {
            hasHover: false,
            hasRing: false,
            hasFocused: false,
            hasPressed: false,
            hasDisable: false,
            hasErrors: false
        }
    },
    'status-icon': {
        prefix: 'status-icon',
        defaultVariant: 'neutral',
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
            hasDisable: false,
            hasErrors: false
        }
    },
    validation: {
        prefix: 'validation',
        defaultVariant: 'danger',
        defaultAspect: {
            rounded: false,
            borders: false,
            size: 'sm',
            width: undefined,
            height: undefined
        },
        defaultVisualVariantType: 'solid',
        defaultStates: {
            hasHover: false,
            hasRing: false,
            hasFocused: false,
            hasPressed: false,
            hasDisable: false,
            hasErrors: false
        }
    },
    layout: {
        prefix: 'layout',
        defaultVariant: 'neutral',
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
            hasDisable: false,
            hasErrors: false
        }
    }
}
