import type { ComponentVariantType } from '../../../types'
import type { IComponentAspect } from '../interfaces/i-component-aspect'
import type { IHeaderStyle } from '../interfaces/i-header-style'
import type { IStyleStatesConfig } from '../interfaces/i-style-states-config'
import type { ComponentType } from '../types/component-type.type'
import type { ExtendedVisualVariantType } from '../types/extended-visual-variant-type.type'

/**
 * Header preset configuration for common use cases
 */
export interface IHeaderPresetConfig {
    /** Preset name for easy reference */
    name: string
    /** Description of when to use this preset */
    description: string
    /** Default header style configuration */
    style: IHeaderStyle
}

/**
 * Component style configuration interface
 */
export interface IComponentStyleConfig {
    prefix: string
    defaultVariant: ComponentVariantType
    defaultAspect: IComponentAspect
    defaultVisualVariantType: ExtendedVisualVariantType
    defaultStates: IStyleStatesConfig
    /** Header presets for this component type */
    headerPresets?: Record<string, IHeaderPresetConfig>
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
        },
        headerPresets: {
            contrast: {
                name: 'High Contrast',
                description: 'Dark header with light text for maximum visual impact',
                style: {
                    disableGenericText: true,
                    forceBackgroundClasses: ['accordion-header'],
                    forceTextClasses: [],
                    customClasses: []
                }
            },
            branded: {
                name: 'Branded Header',
                description: 'Header uses component variant colors with proper contrast',
                style: {
                    disableGenericText: true,
                    forceBackgroundClasses: ['accordion-header'],
                    forceTextClasses: [],
                    customClasses: []
                }
            },
            subtle: {
                name: 'Subtle Header',
                description: 'Minimal contrast header that blends with container',
                style: {
                    disableGenericText: false,
                    forceBackgroundClasses: [],
                    forceTextClasses: [],
                    customClasses: ['bg-opacity-50']
                }
            },
            inverted: {
                name: 'Inverted Theme',
                description: 'Forces dark header regardless of light/dark mode',
                style: {
                    disableGenericText: true,
                    forceBackgroundClasses: ['bg-slate-800'],
                    forceTextClasses: ['text-white'],
                    customClasses: []
                }
            }
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
        },
        headerPresets: {
            contrast: {
                name: 'High Contrast Card Header',
                description: 'Bold header that stands out from card content',
                style: {
                    disableGenericText: true,
                    forceBackgroundClasses: ['card-header'],
                    forceTextClasses: [],
                    customClasses: []
                }
            },
            branded: {
                name: 'Branded Card Header',
                description: 'Header uses card variant colors',
                style: {
                    disableGenericText: true,
                    forceBackgroundClasses: ['card-header'],
                    forceTextClasses: [],
                    customClasses: []
                }
            }
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
        },
        headerPresets: {
            contrast: {
                name: 'High Contrast Drawer Header',
                description: 'Bold header for drawer/sidebar navigation',
                style: {
                    disableGenericText: true,
                    forceBackgroundClasses: ['drawer-header'],
                    forceTextClasses: [],
                    customClasses: []
                }
            },
            subtle: {
                name: 'Subtle Drawer Header',
                description: 'Minimal header that blends with drawer content',
                style: {
                    disableGenericText: false,
                    forceBackgroundClasses: [],
                    forceTextClasses: [],
                    customClasses: ['border-b', 'border-opacity-30']
                }
            }
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
