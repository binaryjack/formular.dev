import { ComponentsTypes } from '@/types/enums/components-enum'
import { IComponentPreset } from '../generic-styling'

export const COMPONENT_PRESET: Record<ComponentsTypes, IComponentPreset[]> = {
    button: [
        // Light mode variants
        {
            mode: 'light',
            variant: 'primary',
            visualVariant: 'solid',
            aspect: {
                borders: false,
                size: 'md',
                rounded: true
            },
            states: {
                hasFocused: true,
                hasHover: true,
                hasRing: true,
                hasPressed: true,
                hasDisable: true,
                hasErrors: false
            },
            typography: {
                case: 'normal-case',
                size: 'md',
                variant: 'primary',
                weight: 'medium'
            }
        },
        {
            mode: 'light',
            variant: 'secondary',
            visualVariant: 'outline',
            aspect: {
                borders: true,
                size: 'md',
                rounded: true
            },
            states: {
                hasFocused: true,
                hasHover: true,
                hasRing: true,
                hasPressed: true,
                hasDisable: true,
                hasErrors: false
            },
            typography: {
                case: 'normal-case',
                size: 'md',
                variant: 'secondary',
                weight: 'medium'
            }
        },
        {
            mode: 'light',
            variant: 'danger',
            visualVariant: 'solid',
            aspect: {
                borders: false,
                size: 'md',
                rounded: true
            },
            states: {
                hasFocused: true,
                hasHover: true,
                hasRing: true,
                hasPressed: true,
                hasDisable: true,
                hasErrors: false
            },
            typography: {
                case: 'normal-case',
                size: 'md',
                variant: 'danger',
                weight: 'medium'
            }
        },
        // Dark mode variants
        {
            mode: 'dark',
            variant: 'primary',
            visualVariant: 'solid',
            aspect: {
                borders: false,
                size: 'md',
                rounded: true
            },
            states: {
                hasFocused: true,
                hasHover: true,
                hasRing: true,
                hasPressed: true,
                hasDisable: true,
                hasErrors: false
            },
            typography: {
                case: 'normal-case',
                size: 'md',
                variant: 'primary',
                weight: 'medium'
            }
        },
        {
            mode: 'dark',
            variant: 'secondary',
            visualVariant: 'outline',
            aspect: {
                borders: true,
                size: 'md',
                rounded: true
            },
            states: {
                hasFocused: true,
                hasHover: true,
                hasRing: true,
                hasPressed: true,
                hasDisable: true,
                hasErrors: false
            },
            typography: {
                case: 'normal-case',
                size: 'md',
                variant: 'secondary',
                weight: 'medium'
            }
        }
    ],
    accordion: [
        // Light mode variants
        {
            mode: 'light',
            variant: 'primary',
            visualVariant: 'elevated',
            aspect: {
                borders: true,
                size: 'md',
                rounded: true
            },
            states: {
                hasFocused: true,
                hasHover: true,
                hasRing: false,
                hasPressed: false,
                hasDisable: true,
                hasErrors: false
            },
            typography: {
                case: 'normal-case',
                size: 'md',
                variant: 'primary',
                weight: 'semibold'
            }
        },
        {
            mode: 'light',
            variant: 'neutral',
            visualVariant: 'outline',
            aspect: {
                borders: true,
                size: 'md',
                rounded: true
            },
            states: {
                hasFocused: true,
                hasHover: true,
                hasRing: false,
                hasPressed: false,
                hasDisable: true,
                hasErrors: false
            },
            typography: {
                case: 'normal-case',
                size: 'md',
                variant: 'neutral',
                weight: 'semibold'
            }
        },
        // Dark mode variants
        {
            mode: 'dark',
            variant: 'primary',
            visualVariant: 'elevated',
            aspect: {
                borders: true,
                size: 'md',
                rounded: true
            },
            states: {
                hasFocused: true,
                hasHover: true,
                hasRing: false,
                hasPressed: false,
                hasDisable: true,
                hasErrors: false
            },
            typography: {
                case: 'normal-case',
                size: 'md',
                variant: 'primary',
                weight: 'semibold'
            }
        }
    ],
    datePicker: [
        // Light mode variants
        {
            mode: 'light',
            variant: 'primary',
            visualVariant: 'outline',
            aspect: {
                borders: true,
                size: 'md',
                rounded: true
            },
            states: {
                hasFocused: true,
                hasHover: true,
                hasRing: true,
                hasPressed: false,
                hasDisable: true,
                hasErrors: true
            },
            typography: {
                case: 'normal-case',
                size: 'md',
                variant: 'primary',
                weight: 'normal'
            }
        },
        // Dark mode variants
        {
            mode: 'dark',
            variant: 'primary',
            visualVariant: 'outline',
            aspect: {
                borders: true,
                size: 'md',
                rounded: true
            },
            states: {
                hasFocused: true,
                hasHover: true,
                hasRing: true,
                hasPressed: false,
                hasDisable: true,
                hasErrors: true
            },
            typography: {
                case: 'normal-case',
                size: 'md',
                variant: 'primary',
                weight: 'normal'
            }
        }
    ],
    card: [
        // Light mode variants
        {
            mode: 'light',
            variant: 'neutral',
            visualVariant: 'elevated',
            aspect: {
                borders: false,
                size: 'md',
                rounded: true
            },
            states: {
                hasFocused: false,
                hasHover: true,
                hasRing: false,
                hasPressed: false,
                hasDisable: false,
                hasErrors: false
            },
            typography: {
                case: 'normal-case',
                size: 'md',
                variant: 'neutral',
                weight: 'normal'
            }
        },
        {
            mode: 'light',
            variant: 'primary',
            visualVariant: 'outline',
            aspect: {
                borders: true,
                size: 'md',
                rounded: true
            },
            states: {
                hasFocused: false,
                hasHover: true,
                hasRing: false,
                hasPressed: false,
                hasDisable: false,
                hasErrors: false
            },
            typography: {
                case: 'normal-case',
                size: 'md',
                variant: 'primary',
                weight: 'normal'
            }
        },
        // Dark mode variants
        {
            mode: 'dark',
            variant: 'neutral',
            visualVariant: 'elevated',
            aspect: {
                borders: false,
                size: 'md',
                rounded: true
            },
            states: {
                hasFocused: false,
                hasHover: true,
                hasRing: false,
                hasPressed: false,
                hasDisable: false,
                hasErrors: false
            },
            typography: {
                case: 'normal-case',
                size: 'md',
                variant: 'neutral',
                weight: 'normal'
            }
        }
    ],
    typography: [
        // Light mode variants
        {
            mode: 'light',
            variant: 'primary',
            visualVariant: 'solid',
            aspect: {
                borders: false,
                size: 'md',
                rounded: false
            },
            states: {
                hasFocused: false,
                hasHover: false,
                hasRing: false,
                hasPressed: false,
                hasDisable: false,
                hasErrors: false
            },
            typography: {
                case: 'normal-case',
                size: 'md',
                variant: 'primary',
                weight: 'normal'
            }
        },
        {
            mode: 'light',
            variant: 'secondary',
            visualVariant: 'solid',
            aspect: {
                borders: false,
                size: 'sm',
                rounded: false
            },
            states: {
                hasFocused: false,
                hasHover: false,
                hasRing: false,
                hasPressed: false,
                hasDisable: false,
                hasErrors: false
            },
            typography: {
                case: 'normal-case',
                size: 'sm',
                variant: 'secondary',
                weight: 'normal'
            }
        },
        // Dark mode variants
        {
            mode: 'dark',
            variant: 'primary',
            visualVariant: 'solid',
            aspect: {
                borders: false,
                size: 'md',
                rounded: false
            },
            states: {
                hasFocused: false,
                hasHover: false,
                hasRing: false,
                hasPressed: false,
                hasDisable: false,
                hasErrors: false
            },
            typography: {
                case: 'normal-case',
                size: 'md',
                variant: 'primary',
                weight: 'normal'
            }
        }
    ],
    baseInput: [
        // Light mode variants
        {
            mode: 'light',
            variant: 'primary',
            visualVariant: 'outline',
            aspect: {
                borders: true,
                size: 'md',
                rounded: true
            },
            states: {
                hasFocused: true,
                hasHover: true,
                hasRing: true,
                hasPressed: false,
                hasDisable: true,
                hasErrors: true
            },
            typography: {
                case: 'normal-case',
                size: 'md',
                variant: 'primary',
                weight: 'normal'
            }
        },
        // Dark mode variants
        {
            mode: 'dark',
            variant: 'primary',
            visualVariant: 'outline',
            aspect: {
                borders: true,
                size: 'md',
                rounded: true
            },
            states: {
                hasFocused: true,
                hasHover: true,
                hasRing: true,
                hasPressed: false,
                hasDisable: true,
                hasErrors: true
            },
            typography: {
                case: 'normal-case',
                size: 'md',
                variant: 'primary',
                weight: 'normal'
            }
        }
    ],
    checkboxInput: [
        // Light mode variants
        {
            mode: 'light',
            variant: 'primary',
            visualVariant: 'outline',
            aspect: {
                borders: true,
                size: 'sm',
                rounded: true
            },
            states: {
                hasFocused: true,
                hasHover: true,
                hasRing: true,
                hasPressed: true,
                hasDisable: true,
                hasErrors: true
            },
            typography: {
                case: 'normal-case',
                size: 'sm',
                variant: 'primary',
                weight: 'normal'
            }
        },
        // Dark mode variants
        {
            mode: 'dark',
            variant: 'primary',
            visualVariant: 'outline',
            aspect: {
                borders: true,
                size: 'sm',
                rounded: true
            },
            states: {
                hasFocused: true,
                hasHover: true,
                hasRing: true,
                hasPressed: true,
                hasDisable: true,
                hasErrors: true
            },
            typography: {
                case: 'normal-case',
                size: 'sm',
                variant: 'primary',
                weight: 'normal'
            }
        }
    ],
    radioInput: [
        // Light mode variants
        {
            mode: 'light',
            variant: 'primary',
            visualVariant: 'outline',
            aspect: {
                borders: true,
                size: 'sm',
                rounded: true
            },
            states: {
                hasFocused: true,
                hasHover: true,
                hasRing: true,
                hasPressed: true,
                hasDisable: true,
                hasErrors: true
            },
            typography: {
                case: 'normal-case',
                size: 'sm',
                variant: 'primary',
                weight: 'normal'
            }
        },
        // Dark mode variants
        {
            mode: 'dark',
            variant: 'primary',
            visualVariant: 'outline',
            aspect: {
                borders: true,
                size: 'sm',
                rounded: true
            },
            states: {
                hasFocused: true,
                hasHover: true,
                hasRing: true,
                hasPressed: true,
                hasDisable: true,
                hasErrors: true
            },
            typography: {
                case: 'normal-case',
                size: 'sm',
                variant: 'primary',
                weight: 'normal'
            }
        }
    ],
    checkGroupInput: [
        // Light mode variants
        {
            mode: 'light',
            variant: 'primary',
            visualVariant: 'outline',
            aspect: {
                borders: true,
                size: 'md',
                rounded: true
            },
            states: {
                hasFocused: true,
                hasHover: true,
                hasRing: true,
                hasPressed: false,
                hasDisable: true,
                hasErrors: true
            },
            typography: {
                case: 'normal-case',
                size: 'md',
                variant: 'primary',
                weight: 'normal'
            }
        },
        // Dark mode variants
        {
            mode: 'dark',
            variant: 'primary',
            visualVariant: 'outline',
            aspect: {
                borders: true,
                size: 'md',
                rounded: true
            },
            states: {
                hasFocused: true,
                hasHover: true,
                hasRing: true,
                hasPressed: false,
                hasDisable: true,
                hasErrors: true
            },
            typography: {
                case: 'normal-case',
                size: 'md',
                variant: 'primary',
                weight: 'normal'
            }
        }
    ],
    dropdown: [
        // Light mode variants
        {
            mode: 'light',
            variant: 'primary',
            visualVariant: 'outline',
            aspect: {
                borders: true,
                size: 'md',
                rounded: true
            },
            states: {
                hasFocused: true,
                hasHover: true,
                hasRing: true,
                hasPressed: true,
                hasDisable: true,
                hasErrors: true
            },
            typography: {
                case: 'normal-case',
                size: 'md',
                variant: 'primary',
                weight: 'normal'
            }
        },
        // Dark mode variants
        {
            mode: 'dark',
            variant: 'primary',
            visualVariant: 'outline',
            aspect: {
                borders: true,
                size: 'md',
                rounded: true
            },
            states: {
                hasFocused: true,
                hasHover: true,
                hasRing: true,
                hasPressed: true,
                hasDisable: true,
                hasErrors: true
            },
            typography: {
                case: 'normal-case',
                size: 'md',
                variant: 'primary',
                weight: 'normal'
            }
        }
    ],
    fieldSet: [
        // Light mode variants
        {
            mode: 'light',
            variant: 'neutral',
            visualVariant: 'outline',
            aspect: {
                borders: true,
                size: 'md',
                rounded: true
            },
            states: {
                hasFocused: false,
                hasHover: false,
                hasRing: false,
                hasPressed: false,
                hasDisable: true,
                hasErrors: true
            },
            typography: {
                case: 'normal-case',
                size: 'sm',
                variant: 'neutral',
                weight: 'semibold'
            }
        },
        // Dark mode variants
        {
            mode: 'dark',
            variant: 'neutral',
            visualVariant: 'outline',
            aspect: {
                borders: true,
                size: 'md',
                rounded: true
            },
            states: {
                hasFocused: false,
                hasHover: false,
                hasRing: false,
                hasPressed: false,
                hasDisable: true,
                hasErrors: true
            },
            typography: {
                case: 'normal-case',
                size: 'sm',
                variant: 'neutral',
                weight: 'semibold'
            }
        }
    ],
    label: [
        // Light mode variants
        {
            mode: 'light',
            variant: 'primary',
            visualVariant: 'solid',
            aspect: {
                borders: false,
                size: 'sm',
                rounded: false
            },
            states: {
                hasFocused: false,
                hasHover: false,
                hasRing: false,
                hasPressed: false,
                hasDisable: true,
                hasErrors: true
            },
            typography: {
                case: 'normal-case',
                size: 'sm',
                variant: 'primary',
                weight: 'medium'
            }
        },
        // Dark mode variants
        {
            mode: 'dark',
            variant: 'primary',
            visualVariant: 'solid',
            aspect: {
                borders: false,
                size: 'sm',
                rounded: false
            },
            states: {
                hasFocused: false,
                hasHover: false,
                hasRing: false,
                hasPressed: false,
                hasDisable: true,
                hasErrors: true
            },
            typography: {
                case: 'normal-case',
                size: 'sm',
                variant: 'primary',
                weight: 'medium'
            }
        }
    ],
    spinner: [
        // Light mode variants
        {
            mode: 'light',
            variant: 'primary',
            visualVariant: 'solid',
            aspect: {
                borders: false,
                size: 'md',
                rounded: true
            },
            states: {
                hasFocused: false,
                hasHover: false,
                hasRing: false,
                hasPressed: false,
                hasDisable: false,
                hasErrors: false
            },
            typography: {
                case: 'normal-case',
                size: 'sm',
                variant: 'primary',
                weight: 'normal'
            }
        },
        // Dark mode variants
        {
            mode: 'dark',
            variant: 'primary',
            visualVariant: 'solid',
            aspect: {
                borders: false,
                size: 'md',
                rounded: true
            },
            states: {
                hasFocused: false,
                hasHover: false,
                hasRing: false,
                hasPressed: false,
                hasDisable: false,
                hasErrors: false
            },
            typography: {
                case: 'normal-case',
                size: 'sm',
                variant: 'primary',
                weight: 'normal'
            }
        }
    ],
    statusIcon: [
        // Light mode variants
        {
            mode: 'light',
            variant: 'primary',
            visualVariant: 'solid',
            aspect: {
                borders: false,
                size: 'sm',
                rounded: true
            },
            states: {
                hasFocused: false,
                hasHover: true,
                hasRing: false,
                hasPressed: false,
                hasDisable: false,
                hasErrors: false
            },
            typography: {
                case: 'normal-case',
                size: 'sm',
                variant: 'primary',
                weight: 'normal'
            }
        },
        {
            mode: 'light',
            variant: 'success',
            visualVariant: 'solid',
            aspect: {
                borders: false,
                size: 'sm',
                rounded: true
            },
            states: {
                hasFocused: false,
                hasHover: true,
                hasRing: false,
                hasPressed: false,
                hasDisable: false,
                hasErrors: false
            },
            typography: {
                case: 'normal-case',
                size: 'sm',
                variant: 'success',
                weight: 'normal'
            }
        },
        {
            mode: 'light',
            variant: 'danger',
            visualVariant: 'solid',
            aspect: {
                borders: false,
                size: 'sm',
                rounded: true
            },
            states: {
                hasFocused: false,
                hasHover: true,
                hasRing: false,
                hasPressed: false,
                hasDisable: false,
                hasErrors: false
            },
            typography: {
                case: 'normal-case',
                size: 'sm',
                variant: 'danger',
                weight: 'normal'
            }
        },
        // Dark mode variants
        {
            mode: 'dark',
            variant: 'primary',
            visualVariant: 'solid',
            aspect: {
                borders: false,
                size: 'sm',
                rounded: true
            },
            states: {
                hasFocused: false,
                hasHover: true,
                hasRing: false,
                hasPressed: false,
                hasDisable: false,
                hasErrors: false
            },
            typography: {
                case: 'normal-case',
                size: 'sm',
                variant: 'primary',
                weight: 'normal'
            }
        }
    ],
    drawer: [
        // Light mode variants
        {
            mode: 'light',
            variant: 'neutral',
            visualVariant: 'elevated',
            aspect: {
                borders: true,
                size: 'md',
                rounded: true
            },
            states: {
                hasFocused: false,
                hasHover: false,
                hasRing: false,
                hasPressed: false,
                hasDisable: false,
                hasErrors: false
            },
            typography: {
                case: 'normal-case',
                size: 'md',
                variant: 'neutral',
                weight: 'normal'
            }
        },
        // Dark mode variants
        {
            mode: 'dark',
            variant: 'neutral',
            visualVariant: 'elevated',
            aspect: {
                borders: true,
                size: 'md',
                rounded: true
            },
            states: {
                hasFocused: false,
                hasHover: false,
                hasRing: false,
                hasPressed: false,
                hasDisable: false,
                hasErrors: false
            },
            typography: {
                case: 'normal-case',
                size: 'md',
                variant: 'neutral',
                weight: 'normal'
            }
        }
    ],
    chevronToggle: [
        // Light mode variants
        {
            mode: 'light',
            variant: 'primary',
            visualVariant: 'ghost',
            aspect: {
                borders: false,
                size: 'sm',
                rounded: true
            },
            states: {
                hasFocused: true,
                hasHover: true,
                hasRing: true,
                hasPressed: true,
                hasDisable: true,
                hasErrors: false
            },
            typography: {
                case: 'normal-case',
                size: 'sm',
                variant: 'primary',
                weight: 'normal'
            }
        },
        // Dark mode variants
        {
            mode: 'dark',
            variant: 'primary',
            visualVariant: 'ghost',
            aspect: {
                borders: false,
                size: 'sm',
                rounded: true
            },
            states: {
                hasFocused: true,
                hasHover: true,
                hasRing: true,
                hasPressed: true,
                hasDisable: true,
                hasErrors: false
            },
            typography: {
                case: 'normal-case',
                size: 'sm',
                variant: 'primary',
                weight: 'normal'
            }
        }
    ],
    smartLayout: [
        // Light mode variants
        {
            mode: 'light',
            variant: 'neutral',
            visualVariant: 'solid',
            aspect: {
                borders: false,
                size: 'md',
                rounded: false
            },
            states: {
                hasFocused: false,
                hasHover: false,
                hasRing: false,
                hasPressed: false,
                hasDisable: false,
                hasErrors: false
            },
            typography: {
                case: 'normal-case',
                size: 'md',
                variant: 'neutral',
                weight: 'normal'
            }
        },
        // Dark mode variants
        {
            mode: 'dark',
            variant: 'neutral',
            visualVariant: 'solid',
            aspect: {
                borders: false,
                size: 'md',
                rounded: false
            },
            states: {
                hasFocused: false,
                hasHover: false,
                hasRing: false,
                hasPressed: false,
                hasDisable: false,
                hasErrors: false
            },
            typography: {
                case: 'normal-case',
                size: 'md',
                variant: 'neutral',
                weight: 'normal'
            }
        }
    ],
    formLayout: [
        // Light mode variants
        {
            mode: 'light',
            variant: 'neutral',
            visualVariant: 'solid',
            aspect: {
                borders: false,
                size: 'md',
                rounded: false
            },
            states: {
                hasFocused: false,
                hasHover: false,
                hasRing: false,
                hasPressed: false,
                hasDisable: false,
                hasErrors: false
            },
            typography: {
                case: 'normal-case',
                size: 'md',
                variant: 'neutral',
                weight: 'normal'
            }
        },
        // Dark mode variants
        {
            mode: 'dark',
            variant: 'neutral',
            visualVariant: 'solid',
            aspect: {
                borders: false,
                size: 'md',
                rounded: false
            },
            states: {
                hasFocused: false,
                hasHover: false,
                hasRing: false,
                hasPressed: false,
                hasDisable: false,
                hasErrors: false
            },
            typography: {
                case: 'normal-case',
                size: 'md',
                variant: 'neutral',
                weight: 'normal'
            }
        }
    ]
}
