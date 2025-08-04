/**
 * Generic Component Style Generator
 *
 * A generic utility that can generate component styles for any component type
 * based on the IComponentVariants interface and design system patterns.
 *
 * This provides a unified approach to style generation that can be extended
 * for any component type while maintaining consistency across the design system.
 */

import type {
    ComponentSizeType,
    ComponentVariantType,
    TextCaseType,
    TextWeightType,
    VisualVariantType
} from '../types'
import type { IComponentState } from '../types/interfaces'

/**
 * Component type mapping for prefix generation
 */
export type ComponentType =
    | 'button'
    | 'btn'
    | 'input'
    | 'textarea'
    | 'card'
    | 'checkbox'
    | 'radio'
    | 'switch'
    | 'select'
    | 'field'
    | 'label'
    | 'badge'
    | 'alert'
    | 'modal'
    | 'drawer'
    | 'tooltip'
    | 'accordion'
    | 'tab'
    | 'progress'
    | 'avatar'
    | 'chip'
    | 'divider'

/**
 * Extended visual variant type that includes component-specific variants
 */
export type ExtendedVisualVariantType = VisualVariantType | 'elevated' | 'outlined'

/**
 * Generic component variants options
 */
export interface IGenericComponentVariants {
    variant: ComponentVariantType
    size: ComponentSizeType
    textCase: TextCaseType
    weight: TextWeightType
    rounded: boolean
    width: string
    height: string
    className: string
    visualVariant?: ExtendedVisualVariantType
    state?: IComponentState
}

/**
 * Style generation configuration for each component type
 */
interface IComponentStyleConfig {
    /** Base CSS class prefix (e.g., 'btn', 'input', 'card') */
    prefix: string
    /** Whether to include visual variants (solid, outline, ghost, link) */
    hasVisualVariants: boolean
    /** Whether to include color variants (primary, secondary, etc.) */
    hasColorVariants: boolean
    /** Whether to include size variants */
    hasSizeVariants: boolean
    /** Whether to include state classes */
    hasStateClasses: boolean
    /** Custom class patterns for special cases */
    customPatterns?: {
        base?: string
        size?: (size: ComponentSizeType) => string
        variant?: (variant: ComponentVariantType) => string
        visualVariant?: (visual: ExtendedVisualVariantType, color?: ComponentVariantType) => string
        state?: (state: keyof IComponentState) => string
    }
}

/**
 * Configuration mapping for different component types
 */
const COMPONENT_CONFIGS: Record<ComponentType, IComponentStyleConfig> = {
    // Button configurations
    button: {
        prefix: 'btn',
        hasVisualVariants: true,
        hasColorVariants: true,
        hasSizeVariants: true,
        hasStateClasses: true
    },
    btn: {
        prefix: 'btn',
        hasVisualVariants: true,
        hasColorVariants: true,
        hasSizeVariants: true,
        hasStateClasses: true
    },

    // Input configurations
    input: {
        prefix: 'input',
        hasVisualVariants: false,
        hasColorVariants: false,
        hasSizeVariants: true,
        hasStateClasses: true,
        customPatterns: {
            size: size => `input-${size}`,
            state: state => `input-${state}`
        }
    },
    textarea: {
        prefix: 'textarea',
        hasVisualVariants: false,
        hasColorVariants: false,
        hasSizeVariants: true,
        hasStateClasses: true,
        customPatterns: {
            size: size => `textarea-${size}`,
            state: state => `textarea-${state}`
        }
    },
    select: {
        prefix: 'select',
        hasVisualVariants: false,
        hasColorVariants: false,
        hasSizeVariants: true,
        hasStateClasses: true,
        customPatterns: {
            size: size => `select-${size}`,
            state: state => `select-${state}`
        }
    },

    // Form control configurations
    checkbox: {
        prefix: 'checkbox',
        hasVisualVariants: false,
        hasColorVariants: true,
        hasSizeVariants: true,
        hasStateClasses: true,
        customPatterns: {
            variant: variant => `checkbox-${variant}`,
            size: size => `checkbox-${size}`
        }
    },
    radio: {
        prefix: 'radio',
        hasVisualVariants: false,
        hasColorVariants: true,
        hasSizeVariants: true,
        hasStateClasses: true,
        customPatterns: {
            variant: variant => `radio-${variant}`,
            size: size => `radio-${size}`
        }
    },
    switch: {
        prefix: 'switch',
        hasVisualVariants: false,
        hasColorVariants: true,
        hasSizeVariants: true,
        hasStateClasses: true,
        customPatterns: {
            variant: variant => `switch-${variant}`,
            size: size => `switch-${size}`
        }
    },

    // Layout configurations
    card: {
        prefix: 'card',
        hasVisualVariants: true,
        hasColorVariants: false,
        hasSizeVariants: false,
        hasStateClasses: true,
        customPatterns: {
            visualVariant: visual => {
                switch (visual) {
                    case 'elevated':
                        return 'card-elevated'
                    case 'outlined':
                        return 'card-outlined'
                    case 'outline':
                        return 'card-outlined' // Map outline to outlined for cards
                    case 'solid':
                    default:
                        return 'card'
                }
            }
        }
    },
    field: {
        prefix: 'field',
        hasVisualVariants: false,
        hasColorVariants: false,
        hasSizeVariants: false,
        hasStateClasses: true,
        customPatterns: {
            base: 'field-container',
            state: state => `field-${state}`
        }
    },

    // Typography configurations
    label: {
        prefix: 'label',
        hasVisualVariants: false,
        hasColorVariants: true,
        hasSizeVariants: true,
        hasStateClasses: false,
        customPatterns: {
            variant: variant => `label-${variant}`,
            size: size => `label-${size}`
        }
    },

    // Feedback configurations
    badge: {
        prefix: 'badge',
        hasVisualVariants: true,
        hasColorVariants: true,
        hasSizeVariants: true,
        hasStateClasses: false
    },
    alert: {
        prefix: 'alert',
        hasVisualVariants: true,
        hasColorVariants: true,
        hasSizeVariants: false,
        hasStateClasses: false
    },

    // Overlay configurations
    modal: {
        prefix: 'modal',
        hasVisualVariants: false,
        hasColorVariants: false,
        hasSizeVariants: true,
        hasStateClasses: true,
        customPatterns: {
            size: size => `modal-${size}`,
            state: state => `modal-${state}`
        }
    },
    drawer: {
        prefix: 'drawer',
        hasVisualVariants: false,
        hasColorVariants: false,
        hasSizeVariants: true,
        hasStateClasses: true,
        customPatterns: {
            size: size => `drawer-${size}`,
            state: state => `drawer-${state}`
        }
    },
    tooltip: {
        prefix: 'tooltip',
        hasVisualVariants: true,
        hasColorVariants: true,
        hasSizeVariants: true,
        hasStateClasses: false
    },

    // Navigation configurations
    accordion: {
        prefix: 'accordion',
        hasVisualVariants: false,
        hasColorVariants: false,
        hasSizeVariants: false,
        hasStateClasses: true,
        customPatterns: {
            state: state => `accordion-${state}`
        }
    },
    tab: {
        prefix: 'tab',
        hasVisualVariants: true,
        hasColorVariants: true,
        hasSizeVariants: true,
        hasStateClasses: true
    },

    // Progress configurations
    progress: {
        prefix: 'progress',
        hasVisualVariants: false,
        hasColorVariants: true,
        hasSizeVariants: true,
        hasStateClasses: false,
        customPatterns: {
            variant: variant => `progress-${variant}`,
            size: size => `progress-${size}`
        }
    },

    // Data display configurations
    avatar: {
        prefix: 'avatar',
        hasVisualVariants: false,
        hasColorVariants: true,
        hasSizeVariants: true,
        hasStateClasses: false,
        customPatterns: {
            variant: variant => `avatar-${variant}`,
            size: size => `avatar-${size}`
        }
    },
    chip: {
        prefix: 'chip',
        hasVisualVariants: true,
        hasColorVariants: true,
        hasSizeVariants: true,
        hasStateClasses: true
    },
    divider: {
        prefix: 'divider',
        hasVisualVariants: false,
        hasColorVariants: true,
        hasSizeVariants: false,
        hasStateClasses: false,
        customPatterns: {
            variant: variant => `divider-${variant}`
        }
    }
}

/**
 * Generate component style classes for any component type
 *
 * @param componentType - The type of component (button, input, card, etc.)
 * @param options - Component variant options
 * @returns Generated CSS class string
 *
 * @example
 * ```typescript
 * // Button styles
 * generateComponentStyles('button', {
 *   visualVariant: 'solid',
 *   variant: 'primary',
 *   size: 'md'
 * })
 * // Returns: "btn btn-md btn-primary"
 *
 * // Input styles
 * generateComponentStyles('input', {
 *   size: 'lg',
 *   state: { error: true, focused: false, disabled: false, hovered: false, pressed: false, loading: false }
 * })
 * // Returns: "input input-lg input-error"
 *
 * // Card styles
 * generateComponentStyles('card', {
 *   visualVariant: 'outlined'
 * })
 * // Returns: "card card-outlined"
 * ```
 */
export const generateComponentStyles = (
    componentType: ComponentType,
    options: Partial<IGenericComponentVariants> = {}
): string => {
    const config = COMPONENT_CONFIGS[componentType]
    if (!config) {
        console.warn(`Unknown component type: ${componentType}`)
        return ''
    }

    const {
        variant = 'primary',
        size = 'md',
        textCase = 'normal-case',
        weight = 'normal',
        rounded = false,
        className = '',
        visualVariant = 'solid',
        state
    } = options

    const classes: string[] = []

    // Base class
    const baseClass = config.customPatterns?.base || config.prefix
    classes.push(baseClass)

    // Size classes
    if (config.hasSizeVariants) {
        const sizeClass = config.customPatterns?.size
            ? config.customPatterns.size(size)
            : `${config.prefix}-${size}`
        classes.push(sizeClass)
    }

    // Visual variant + color variant classes
    if (config.hasVisualVariants && config.hasColorVariants) {
        const variantClass = config.customPatterns?.visualVariant
            ? config.customPatterns.visualVariant(visualVariant, variant)
            : visualVariant === 'solid'
              ? `${config.prefix}-${variant}`
              : `${config.prefix}-${visualVariant}-${variant}`
        classes.push(variantClass)
    } else if (config.hasVisualVariants) {
        // Only visual variants (like card)
        const variantClass = config.customPatterns?.visualVariant
            ? config.customPatterns.visualVariant(visualVariant, variant)
            : visualVariant === 'solid'
              ? config.prefix
              : `${config.prefix}-${visualVariant}`
        if (variantClass !== config.prefix) {
            classes.push(variantClass)
        }
    } else if (config.hasColorVariants) {
        // Only color variants (like progress, avatar)
        const variantClass = config.customPatterns?.variant
            ? config.customPatterns.variant(variant)
            : `${config.prefix}-${variant}`
        classes.push(variantClass)
    }

    // State classes
    if (config.hasStateClasses && state) {
        Object.entries(state).forEach(([stateKey, stateValue]) => {
            if (stateValue) {
                const stateClass = config.customPatterns?.state
                    ? config.customPatterns.state(stateKey as keyof IComponentState)
                    : componentType === 'button' || componentType === 'btn'
                      ? `state-${stateKey}` // Buttons use 'state-' prefix
                      : `${config.prefix}-${stateKey}` // Other components use component prefix
                classes.push(stateClass)
            }
        })
    }

    // Text case and weight utilities
    if (textCase && textCase !== 'normal-case') {
        classes.push(textCase)
    }
    if (weight && weight !== 'normal') {
        classes.push(`font-${weight}`)
    }

    // Rounded utility - only add rounded-none if explicitly set to false
    if (rounded === false) {
        classes.push('rounded-none')
    }

    // Custom className
    if (className) {
        classes.push(className)
    }

    return classes.filter(Boolean).join(' ').trim()
}

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

/**
 * Create a strongly-typed style generator for a specific component type
 *
 * @example
 * ```typescript
 * const generateButtonStyles = createComponentStyleGenerator('button')
 * const buttonClasses = generateButtonStyles({
 *   visualVariant: 'outline',
 *   variant: 'secondary',
 *   size: 'lg'
 * })
 * ```
 */
export const createComponentStyleGenerator = (componentType: ComponentType) => {
    return (options: Partial<IGenericComponentVariants> = {}) => {
        return generateComponentStyles(componentType, options)
    }
}

// Pre-created generators for common components
export const generateButtonComponentStyles = createComponentStyleGenerator('button')
export const generateInputComponentStyles = createComponentStyleGenerator('input')
export const generateCardComponentStyles = createComponentStyleGenerator('card')
export const generateCheckboxComponentStyles = createComponentStyleGenerator('checkbox')
export const generateRadioComponentStyles = createComponentStyleGenerator('radio')
export const generateSwitchComponentStyles = createComponentStyleGenerator('switch')
export const generateBadgeComponentStyles = createComponentStyleGenerator('badge')
export const generateAlertComponentStyles = createComponentStyleGenerator('alert')
