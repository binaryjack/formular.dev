/**
 * Generic Component Style Generator
 *
 * A generic utility that can generate component styles for any component type
 * based on the IComponentVariants interface and design system patterns.
 *
 * This provides a unified approach to style generation that can be extended
 * for any component type while maintaining consistency across the design system.
 */

import { animations } from '../tokens/animations'
import { colors } from '../tokens/colors'
import { spacing } from '../tokens/spacing'
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
    | 'typography'
    | 'text'
    // TODO: Add these when CSS files are created
    // | 'badge'
    // | 'alert'
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
    /** Color variant (primary, secondary, info, danger, success, warning, neutral) */
    variant: ComponentVariantType
    /** Component size (2xs, xs, sm, md, lg, xl, 2xl, 3xl) */
    size: ComponentSizeType
    /** Text case transformation */
    textCase: TextCaseType
    /** Font weight */
    weight: TextWeightType
    /** Border radius control (false = rounded-none) */
    rounded: boolean
    /** Custom width */
    width: string
    /** Custom height */
    height: string
    /** Additional CSS classes */
    className: string
    /** Visual style variant - for buttons this is the "type" (solid, outline, ghost, link) */
    visualVariant?: ExtendedVisualVariantType
    /** Component interaction state */
    state?: IComponentState
}

/**
 * Button-specific variants interface with clearer naming
 */
export interface IButtonVariants {
    /** Button type/style (solid, outline, ghost, link) */
    type?: VisualVariantType
    /** Color theme (primary, secondary, info, danger, success, warning, neutral) */
    color?: ComponentVariantType
    /** Button size (2xs, xs, sm, md, lg, xl, 2xl, 3xl) */
    size?: ComponentSizeType
    /** Border radius control (false = rounded-none) */
    rounded?: boolean
    /** Text case transformation */
    textCase?: TextCaseType
    /** Font weight */
    weight?: TextWeightType
    /** Additional CSS classes */
    className?: string
    /** Button interaction state */
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
        state?: (state: keyof IComponentState) => string | null
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
            state: state => {
                // Only generate classes for states that exist in CSS
                const validStates = ['error', 'success', 'warning']
                if (validStates.includes(state)) {
                    return `input-${state}`
                }
                return null // Don't generate invalid state classes
            }
        }
    },
    textarea: {
        prefix: 'textarea',
        hasVisualVariants: false,
        hasColorVariants: false,
        hasSizeVariants: true,
        hasStateClasses: true,
        customPatterns: {
            size: size => `input-textarea-${size}`, // Use input-textarea pattern from CSS
            state: state => {
                // Apply same state logic as input
                const validStates = ['error', 'success', 'warning']
                if (validStates.includes(state)) {
                    return `input-${state}`
                }
                return null
            }
        }
    },
    select: {
        prefix: 'select',
        hasVisualVariants: false,
        hasColorVariants: false,
        hasSizeVariants: true,
        hasStateClasses: true,
        customPatterns: {
            base: 'input input-select', // Select uses input base classes
            size: size => `input-${size}`, // Use input sizing
            state: state => {
                // Apply same state logic as input
                const validStates = ['error', 'success', 'warning']
                if (validStates.includes(state)) {
                    return `input-${state}`
                }
                return null
            }
        }
    },

    // Form control configurations
    checkbox: {
        prefix: 'checkbox',
        hasVisualVariants: false,
        hasColorVariants: false, // CSS only has base .checkbox class, no color variants
        hasSizeVariants: false, // CSS only has base .checkbox class, no size variants
        hasStateClasses: false // CSS handles states via pseudo-classes (:checked, :disabled, :focus)
    },
    radio: {
        prefix: 'radio',
        hasVisualVariants: false,
        hasColorVariants: false, // CSS only has base .radio class, no color variants
        hasSizeVariants: false, // CSS only has base .radio class, no size variants
        hasStateClasses: false // CSS handles states via pseudo-classes (:checked, :disabled, :focus)
    },
    switch: {
        prefix: 'switch',
        hasVisualVariants: false,
        hasColorVariants: false, // CSS only has base .switch class, no color variants
        hasSizeVariants: false, // CSS only has base .switch class, no size variants
        hasStateClasses: false // CSS handles states via data attributes and pseudo-classes
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
    typography: {
        prefix: 'primitive-text',
        hasVisualVariants: false,
        hasColorVariants: true,
        hasSizeVariants: true,
        hasStateClasses: false,
        customPatterns: {
            base: 'primitive-text',
            variant: variant => {
                // Map design system variants to typography variants
                switch (variant) {
                    case 'primary':
                        return 'primitive-text-primary'
                    case 'secondary':
                        return 'primitive-text-secondary'
                    case 'neutral':
                        return 'primitive-text-muted' // Map neutral to muted in typography
                    case 'info':
                    case 'success':
                    case 'warning':
                    case 'danger':
                        return 'primitive-text-primary' // Fallback to primary for semantic colors
                    default:
                        return 'primitive-text-primary'
                }
            },
            size: size => `primitive-text-${size}` // 2xs, xs, sm, md, lg, xl, 2xl, 3xl
        }
    },
    text: {
        prefix: 'primitive-text',
        hasVisualVariants: false,
        hasColorVariants: true,
        hasSizeVariants: true,
        hasStateClasses: false,
        customPatterns: {
            base: 'primitive-text',
            variant: variant => {
                // Map design system variants to typography variants
                switch (variant) {
                    case 'primary':
                        return 'primitive-text-primary'
                    case 'secondary':
                        return 'primitive-text-secondary'
                    case 'neutral':
                        return 'primitive-text-muted' // Map neutral to muted in typography
                    case 'info':
                    case 'success':
                    case 'warning':
                    case 'danger':
                        return 'primitive-text-primary' // Fallback to primary for semantic colors
                    default:
                        return 'primitive-text-primary'
                }
            },
            size: size => `primitive-text-${size}` // 2xs, xs, sm, md, lg, xl, 2xl, 3xl
        }
    },
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
    // NOTE: CSS files for these components don't exist yet - commenting out until they're created
    /*
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
    */

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
        rounded, // Don't set a default, let it be undefined unless explicitly set
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

                // Only push non-null state classes
                if (stateClass) {
                    classes.push(stateClass)
                }
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
export const generateTypographyComponentStyles = createComponentStyleGenerator('typography')
export const generateTextComponentStyles = createComponentStyleGenerator('text')

// ===================================================================
// DEVELOPER-FRIENDLY BUTTON API
// ===================================================================

/**
 * Generate button styles with developer-friendly API
 * This provides the same functionality as the old generateButtonStyles but with clearer naming
 *
 * @param type - Button type/style (solid, outline, ghost, link)
 * @param color - Button color theme (primary, secondary, etc.)
 * @param size - Button size (xs, sm, md, lg, xl, etc.)
 * @param options - Additional options
 */
export const generateButtonStyles = (
    type: VisualVariantType = 'solid',
    color: ComponentVariantType = 'primary',
    size: ComponentSizeType = 'md',
    options: Partial<IButtonVariants> = {}
): string => {
    return generateComponentStyles('button', {
        visualVariant: type,
        variant: color,
        size,
        ...options
    })
}

/**
 * Generate button styles using the new IButtonVariants interface
 * This is the preferred approach for new code
 */
export const generateButtonStylesV2 = (variants: IButtonVariants = {}): string => {
    const { type = 'solid', color = 'primary', size = 'md', ...rest } = variants

    return generateComponentStyles('button', {
        visualVariant: type,
        variant: color,
        size,
        ...rest
    })
}

/**
 * Generate input style classes (backward compatibility)
 * @deprecated Use generateComponentStyles('input', options) instead
 */
export const generateInputStyles = (
    size: ComponentSizeType = 'md',
    state?: IComponentState
): string => {
    return generateComponentStyles('input', {
        size,
        state
    })
}

/**
 * Generate card style classes (backward compatibility)
 * @deprecated Use generateComponentStyles('card', options) instead
 */
export const generateCardStyles = (
    variant: 'default' | 'outlined' | 'elevated' = 'default'
): string => {
    const visualVariant = variant === 'default' ? 'solid' : (variant as ExtendedVisualVariantType)
    return generateComponentStyles('card', {
        visualVariant
    })
}

// ===================================================================
// UTILITY FUNCTIONS FROM COMPONENT-STYLES.TS
// ===================================================================

/**
 * Generate button ripple style classes
 */
export const generateButtonRippleStyles = (color: ComponentVariantType = 'primary'): string => {
    return `btn-ripple-${color}`
}

/**
 * Generate validation message classes
 */
export const generateValidationStyles = (
    type: 'error' | 'success' | 'warning' | 'info'
): string => {
    switch (type) {
        case 'error':
            return 'field-error-text validation-error'
        case 'success':
            return 'field-success-text validation-success'
        case 'warning':
            return 'field-warning-text validation-warning'
        case 'info':
            return 'field-info-text validation-info'
        default:
            return 'field-helper-text'
    }
}

/**
 * Generate field container classes
 */
export const generateFieldStyles = (hasError?: boolean, hasSuccess?: boolean): string => {
    let classes = 'field-container'

    if (hasError) {
        classes += ' field-error'
    } else if (hasSuccess) {
        classes += ' field-success'
    }

    return classes
}

/**
 * Generate focus ring classes
 */
export const generateFocusRing = (color: ComponentVariantType = 'primary'): string => {
    return `focus-ring-${color}`
}

/**
 * Generate loading state classes
 */
export const generateLoadingStyles = (): string => {
    return 'state-loading'
}

/**
 * Generate disabled state classes
 */
export const generateDisabledStyles = (): string => {
    return 'state-disabled'
}

/**
 * Create CSS custom properties for a component
 */
export const createComponentCSSVars = (
    componentName: string,
    tokens: Record<string, string | number>
): Record<string, string> => {
    const cssVars: Record<string, string> = {}

    for (const [key, value] of Object.entries(tokens)) {
        cssVars[`--${componentName}-${key}`] = String(value)
    }

    return cssVars
}

// ===================================================================
// ADDITIONAL UTILITY OBJECTS FROM COMPONENT-STYLES.TS
// ===================================================================

/**
 * ComponentSizeType mapping utilities
 */
export const sizeMap = {
    '2xs': {
        padding: spacing[0.5],
        fontSize: 'text-2xs',
        height: '20px',
        iconSize: '10px'
    },
    xs: {
        padding: spacing[1],
        fontSize: 'text-2xs',
        height: '24px',
        iconSize: '12px'
    },
    sm: {
        padding: spacing[2],
        fontSize: 'text-sm',
        height: '32px',
        iconSize: '16px'
    },
    md: {
        padding: spacing[3],
        fontSize: 'text-base',
        height: '40px',
        iconSize: '20px'
    },
    lg: {
        padding: spacing[4],
        fontSize: 'text-lg',
        height: '48px',
        iconSize: '24px'
    },
    xl: {
        padding: spacing[6],
        fontSize: 'text-xl',
        height: '56px',
        iconSize: '28px'
    },
    '2xl': {
        padding: spacing[8],
        fontSize: 'text-2xl',
        height: '64px',
        iconSize: '32px'
    }
} as const

/**
 * Color utilities for generating dynamic styles
 */
export const colorUtils = {
    /**
     * Get color value by variant and shade
     */
    getColor: (variant: ComponentVariantType, shade: number = 500): string => {
        const colorPalette = colors[variant]
        if (typeof colorPalette === 'object') {
            return (colorPalette as Record<string, string>)[shade.toString()] || ''
        }
        return colorPalette || ''
    },

    /**
     * Generate CSS custom properties for colors
     */
    generateColorVars: (variant: ComponentVariantType): Record<string, string> => {
        const colorPalette = colors[variant]
        const vars: Record<string, string> = {}

        if (typeof colorPalette === 'object') {
            for (const [shade, value] of Object.entries(colorPalette)) {
                vars[`--color-${variant}-${shade}`] = value
            }
        }

        return vars
    }
}

/**
 * Animation utilities
 */
export const animationUtils = {
    /**
     * Get animation duration by speed
     */
    getDuration: (speed: keyof typeof animations.duration): string => {
        return animations.duration[speed]
    },

    /**
     * Get easing function
     */
    getEasing: (type: keyof typeof animations.easing): string => {
        return animations.easing[type]
    },

    /**
     * Create transition string
     */
    createTransition: (
        property: string = 'all',
        duration: keyof typeof animations.duration = 'normal',
        easing: keyof typeof animations.easing = 'easeOut'
    ): string => {
        return `${property} ${animations.duration[duration]} ${animations.easing[easing]}`
    }
}

/**
 * Responsive utilities
 */
export const responsiveUtils = {
    /**
     * Generate responsive classes
     */
    generateResponsive: (baseClass: string, breakpoints: Record<string, string>): string => {
        let classes = baseClass

        for (const [breakpoint, value] of Object.entries(breakpoints)) {
            if (breakpoint !== 'base') {
                classes += ` ${breakpoint}:${value}`
            }
        }

        return classes
    }
}

/**
 * Spacing utilities
 */
export const spacingUtils = {
    /**
     * Get spacing value by key
     */
    getSpacing: (key: keyof typeof spacing): string => {
        return spacing[key]
    },

    /**
     * Generate padding classes
     */
    generatePadding: (size: ComponentSizeType): string => {
        const paddingMap = {
            '2xs': 'p-0.5',
            xs: 'p-1',
            sm: 'p-2',
            md: 'p-3',
            lg: 'p-4',
            xl: 'p-6',
            '2xl': 'p-8',
            '3xl': 'p-12'
        }
        return paddingMap[size] || paddingMap.md
    },

    /**
     * Generate margin classes
     */
    generateMargin: (size: ComponentSizeType): string => {
        const marginMap = {
            '2xs': 'm-0.5',
            xs: 'm-1',
            sm: 'm-2',
            md: 'm-3',
            lg: 'm-4',
            xl: 'm-6',
            '2xl': 'm-8',
            '3xl': 'm-12'
        }
        return marginMap[size] || marginMap.md
    }
}
