import type { IComponentStyleConfig } from './interfaces/i-component-style-config'
import type { ComponentType } from './types/component-type.type'

/**
 * Configuration mapping for different component types
 */
export const COMPONENT_CONFIGS: Record<ComponentType, IComponentStyleConfig> = {
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
