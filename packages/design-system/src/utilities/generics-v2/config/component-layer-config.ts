import type {
    IComponentLayerConfig,
    IStyleConflictResolution
} from '../interfaces/i-composite-component-variants'

/**
 * Component Layer Mapping Configuration
 *
 * Defines which components contribute to which style layers
 * to prevent CSS conflicts in composite components.
 */
export const COMPONENT_LAYER_CONFIG: IComponentLayerConfig = {
    // Components that provide container/background styling
    backgroundComponents: ['button', 'input', 'card', 'modal'],

    // Components that provide content/text styling
    foregroundComponents: ['typography', 'badge', 'chip'],

    // Components that provide interaction styling
    interactionComponents: ['button', 'input', 'chip']
}

/**
 * Style Conflict Resolution Priority
 *
 * When multiple components try to apply the same type of styling,
 * this configuration determines which component wins.
 *
 * Higher index = higher priority (last item wins)
 */
export const STYLE_CONFLICT_RESOLUTION: IStyleConflictResolution = {
    // For text color conflicts - Typography always wins over container components
    textColorPriority: [
        'button', // Lowest priority - smart contrast
        'input',
        'card',
        'typography' // Highest priority - explicit text styling
    ],

    // For background color conflicts - Container components win
    backgroundColorPriority: [
        'typography', // Lowest priority
        'badge',
        'input',
        'button', // Highest priority - explicit background styling
        'card'
    ],

    // For sizing conflicts - Explicit size components win
    sizingPriority: [
        'typography', // Lowest priority
        'badge',
        'button', // Higher priority - component sizing
        'input' // Highest priority - form component sizing
    ]
}

/**
 * Smart Contrast Override Rules
 *
 * Defines when smart contrast should be overridden by explicit typography settings.
 */
export const SMART_CONTRAST_RULES = {
    /**
     * When these component combinations are used together,
     * smart contrast is disabled in favor of explicit typography styling
     *
     * NOTE: button+typography removed to allow smart contrast for buttons
     * NOTE: input+typography removed to allow smart contrast for inputs
     */
    disableSmartContrastFor: [['card', 'badge'] as const] as const,

    /**
     * Components that should always inherit smart contrast from their parent
     */
    inheritSmartContrast: ['typography', 'badge', 'chip'] as const
} as const
