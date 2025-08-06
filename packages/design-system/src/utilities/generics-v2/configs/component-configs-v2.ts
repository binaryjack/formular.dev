import type { ComponentSizeType, ComponentVariantType } from '../../../types'
import type { IComponentState } from '../../../types/interfaces'
import type { ExtendedVisualVariantType } from '../../types/extended-visual-variant-type.type'
import type { ComponentTypeV2 } from '../types/component-type-v2.type'

/**
 * Configuration for how each component type generates CSS classes
 */
export interface IComponentStyleConfigV2 {
    /** Base CSS class prefix */
    prefix: string

    /** Whether component supports visual variants (solid, outline, ghost, etc.) */
    hasVisualVariants: boolean

    /** Whether component supports color variants (primary, secondary, etc.) */
    hasColorVariants: boolean

    /** Whether component supports size variants */
    hasSizeVariants: boolean

    /** Whether component supports state classes */
    hasStateClasses: boolean

    /** Whether component should generate typography classes */
    hasTypographySupport: boolean

    /** Custom patterns for special component needs */
    customPatterns?: {
        base?: string
        size?: (size: ComponentSizeType) => string
        variant?: (variant: ComponentVariantType) => string
        visualVariant?: (visual: ExtendedVisualVariantType, color?: ComponentVariantType) => string
        state?: (state: keyof IComponentState) => string | null
    }
}

/**
 * Component configurations for V2 system
 * Starting with core components: button, typography, input
 */
export const COMPONENT_CONFIGS_V2: Record<ComponentTypeV2, IComponentStyleConfigV2> = {
    /**
     * Button: Complex component with all features
     * - Visual variants: solid, outline, ghost, link
     * - Color variants: primary, secondary, danger, etc.
     * - Size variants: 2xs to 2xl
     * - State support: hover, focus, disabled, loading
     * - Typography support: for button text
     */
    button: {
        prefix: 'btn',
        hasVisualVariants: true,
        hasColorVariants: true,
        hasSizeVariants: true,
        hasStateClasses: true,
        hasTypographySupport: true
    },

    /**
     * Typography: Pure text component
     * - No visual variants (text doesn't have outline/solid)
     * - Color variants: for text colors
     * - Size variants: for text sizes
     * - No state classes (handled by parent)
     * - Typography support: this IS typography
     */
    typography: {
        prefix: '', // Typography uses no component prefix, only text-* classes
        hasVisualVariants: false,
        hasColorVariants: false, // Colors handled via typography.variant -> text-*
        hasSizeVariants: false, // Sizes handled via typography.size -> text-*
        hasStateClasses: false,
        hasTypographySupport: true,
        customPatterns: {
            base: '' // No base class for pure typography
        }
    },

    /**
     * Input: Mixed component
     * - No visual variants (inputs are always solid-style)
     * - No color variants (inputs use semantic states)
     * - Size variants: xs to xl
     * - State support: error, success, warning, focus
     * - Typography support: for placeholder and input text
     */
    input: {
        prefix: 'input',
        hasVisualVariants: false,
        hasColorVariants: false,
        hasSizeVariants: true,
        hasStateClasses: true,
        hasTypographySupport: true,
        customPatterns: {
            size: size => `input-${size}`,
            state: (state: keyof IComponentState) => {
                // Only generate classes for states that exist in CSS
                const validStates: (keyof IComponentState)[] = ['error', 'focused']
                if (validStates.includes(state)) {
                    return `input-${String(state)}`
                }
                return null
            }
        }
    },

    /**
     * Card: Container component
     * - Visual variants: solid, outline, elevated
     * - Color variants: primary, secondary, neutral
     * - Size variants: sm to xl (for padding/spacing)
     * - State support: hover, focus (for interactive cards)
     * - Typography support: for card content
     */
    card: {
        prefix: 'card',
        hasVisualVariants: true,
        hasColorVariants: true,
        hasSizeVariants: true,
        hasStateClasses: true,
        hasTypographySupport: true
    },

    /**
     * Accordion: Container component with expansion
     * - Visual variants: solid, outline
     * - Color variants: primary, secondary, neutral
     * - Size variants: sm to lg
     * - State support: disabled (expanded state handled separately)
     * - Typography support: for accordion header/content
     */
    accordion: {
        prefix: 'accordion',
        hasVisualVariants: true,
        hasColorVariants: true,
        hasSizeVariants: true,
        hasStateClasses: true,
        hasTypographySupport: true,
        customPatterns: {
            state: (state: keyof IComponentState) => {
                // Only use available IComponentState properties
                const validStates: (keyof IComponentState)[] = ['disabled']
                if (validStates.includes(state)) {
                    return `accordion-${String(state)}`
                }
                return null
            }
        }
    },

    /**
     * Modal: Overlay component
     * - Visual variants: solid, outline
     * - Color variants: neutral (primary for confirmation modals)
     * - Size variants: xs to 2xl (for modal width)
     * - State support: disabled (open/closed handled by visibility)
     * - Typography support: for modal content
     */
    modal: {
        prefix: 'modal',
        hasVisualVariants: true,
        hasColorVariants: true,
        hasSizeVariants: true,
        hasStateClasses: true,
        hasTypographySupport: true,
        customPatterns: {
            state: (state: keyof IComponentState) => {
                // Only use available IComponentState properties
                const validStates: (keyof IComponentState)[] = ['disabled']
                if (validStates.includes(state)) {
                    return `modal-${String(state)}`
                }
                return null
            }
        }
    },

    /**
     * Badge: Small indicator component
     * - Visual variants: solid, outline, ghost
     * - Color variants: primary, secondary, success, warning, danger
     * - Size variants: xs to lg
     * - No state classes (badges are static)
     * - Typography support: for badge text
     */
    badge: {
        prefix: 'badge',
        hasVisualVariants: true,
        hasColorVariants: true,
        hasSizeVariants: true,
        hasStateClasses: false,
        hasTypographySupport: true
    },

    /**
     * Chip: Interactive tag component
     * - Visual variants: solid, outline, ghost
     * - Color variants: primary, secondary, neutral
     * - Size variants: sm to lg
     * - State support: hover, focus, disabled (selected handled separately)
     * - Typography support: for chip text
     */
    chip: {
        prefix: 'chip',
        hasVisualVariants: true,
        hasColorVariants: true,
        hasSizeVariants: true,
        hasStateClasses: true,
        hasTypographySupport: true,
        customPatterns: {
            state: (state: keyof IComponentState) => {
                // Only use available IComponentState properties
                const validStates: (keyof IComponentState)[] = ['disabled', 'focused', 'hovered']
                if (validStates.includes(state)) {
                    return `chip-${String(state)}`
                }
                return null
            }
        }
    }
}
