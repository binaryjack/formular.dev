import { COMPONENT_LAYER_CONFIG, SMART_CONTRAST_RULES } from './config/component-layer-config'
import { COMPONENT_CONFIGS_V2 } from './configs/component-configs-v2'
import { genericStyle } from './generic-style-generator-v2'
import type {
    ICompositeComponentVariants,
    ILayeredStyleOutput
} from './interfaces/i-composite-component-variants'
import type { IGenericComponentVariantsV2 } from './interfaces/i-generic-component-variants-v2'
import type { ComponentTypeV2 } from './types/component-type-v2.type'

/**
 * Composite Style Generator
 *
 * Generates layered styles for multiple components working together,
 * resolving conflicts and preventing CSS specificity issues.
 *
 * @param variants Configuration for composite components
 * @returns Layered style output with separated concerns
 *
 * @example
 * ```typescript
 * // Button with Typography
 * const styles = compositeStyle({
 *   componentTypes: ['button', 'typography'],
 *   variant: 'primary',
 *   visualVariant: 'solid',
 *   typography: { variant: 'neutral' }
 * })
 *
 * // Apply to components:
 * <button className={styles.backgroundClasses}>
 *   <Typography className={styles.foregroundClasses}>Text</Typography>
 * </button>
 * ```
 */
export const compositeStyle = (variants: ICompositeComponentVariants): ILayeredStyleOutput => {
    if (!variants.componentTypes || variants.componentTypes.length === 0) {
        console.error('❌ CompositeStyle: componentTypes array is required')
        return {
            backgroundClasses: '',
            foregroundClasses: '',
            interactionClasses: '',
            combined: ''
        }
    }

    const backgroundClasses: string[] = []
    const foregroundClasses: string[] = []
    const interactionClasses: string[] = []

    // Check if smart contrast should be disabled for this combination
    const shouldDisableSmartContrast = SMART_CONTRAST_RULES.disableSmartContrastFor.some(
        (disabledCombo: readonly ComponentTypeV2[]) =>
            variants.componentTypes.every(type => disabledCombo.includes(type))
    )

    // Check if any component in the combination has visual variants (button, card, etc.)
    // If so, that component owns the text colors and typography should not generate color classes
    const hasVisualVariantComponent = variants.componentTypes.some(type => {
        const config = COMPONENT_CONFIGS_V2[type]
        return config?.hasVisualVariants
    })

    if (process.env.NODE_ENV === 'development') {
        console.log(`🎯 CompositeStyle: Processing components`, {
            componentTypes: variants.componentTypes,
            shouldDisableSmartContrast,
            hasVisualVariantComponent,
            typography: variants.typography
        })
    }

    // Process each component type
    for (const componentType of variants.componentTypes) {
        // Create individual component config
        const componentConfig: IGenericComponentVariantsV2 = {
            componentType,
            variant: variants.variant,
            size: variants.size,
            visualVariant: variants.visualVariant,
            state: variants.state,
            rounded: variants.rounded,
            width: variants.width,
            height: variants.height
        }

        // Handle typography overrides and smart contrast
        if (componentType === 'typography' && variants.typography) {
            // Typography component gets explicit typography settings
            componentConfig.typography = variants.typography
        } else if (
            componentType === 'typography' &&
            hasVisualVariantComponent &&
            !variants.typography
        ) {
            // When there's a visual variant component (button, card),
            // typography should only provide font styling, not colors
            componentConfig.typography = {
                // Only inherit size, case, and weight - no color variant
                size: variants.size,
                case: 'normal-case',
                weight: 'normal'
            }
        } else if (
            shouldDisableSmartContrast &&
            (SMART_CONTRAST_RULES.inheritSmartContrast as readonly ComponentTypeV2[]).includes(
                componentType
            )
        ) {
            // Disable smart contrast for child components when explicit typography is provided
            componentConfig.typography = variants.typography || {
                variant: variants.variant // Inherit parent variant if no explicit typography
            }
        }

        // Generate styles for this component
        const componentStyles = genericStyle(componentConfig)

        // Distribute styles to appropriate layers based on component type
        // IMPORTANT: Components should only contribute to their primary layer to avoid conflicts

        if (COMPONENT_LAYER_CONFIG.backgroundComponents.includes(componentType)) {
            // Background components (button, input, card) - exclude text classes
            const bgClasses = extractBackgroundClasses(componentStyles)
            backgroundClasses.push(...bgClasses)
        }

        if (COMPONENT_LAYER_CONFIG.foregroundComponents.includes(componentType)) {
            // Foreground components (typography, badge) - exclude colors if visual variant component present
            const fgClasses = extractForegroundClasses(componentStyles, hasVisualVariantComponent)
            foregroundClasses.push(...fgClasses)
        }

        if (COMPONENT_LAYER_CONFIG.interactionComponents.includes(componentType)) {
            // Interaction components - only interaction classes
            const intClasses = extractInteractionClasses(componentStyles)
            interactionClasses.push(...intClasses)
        }
    }

    // Remove duplicates and resolve conflicts
    const resolvedBackground = resolveStyleConflicts(backgroundClasses, 'background')
    const resolvedForeground = resolveStyleConflicts(foregroundClasses, 'foreground')
    const resolvedInteraction = resolveStyleConflicts(interactionClasses, 'interaction')

    // Add custom class names if provided
    if (variants.backgroundClassName) {
        resolvedBackground.push(...variants.backgroundClassName.split(' '))
    }
    if (variants.foregroundClassName) {
        resolvedForeground.push(...variants.foregroundClassName.split(' '))
    }

    const result = {
        backgroundClasses: resolvedBackground.join(' '),
        foregroundClasses: resolvedForeground.join(' '),
        interactionClasses: resolvedInteraction.join(' '),
        combined: [...resolvedBackground, ...resolvedForeground, ...resolvedInteraction].join(' ')
    }

    if (process.env.NODE_ENV === 'development') {
        console.log('✅ CompositeStyle result:', result)
    }

    return result
}

/**
 * Extract background/container related classes from component styles
 * Components with visual variants (button, card) keep ALL their classes including text colors
 * This prevents conflicts with composite typography components
 */
function extractBackgroundClasses(styles: string): string[] {
    return styles
        .split(' ')
        .filter(cls => cls.trim() !== '') // Remove empty strings
        .filter(
            cls =>
                // Component structure classes - these keep ALL their styles
                cls.startsWith('btn') ||
                cls.startsWith('input') ||
                cls.startsWith('card') ||
                cls.startsWith('modal') ||
                // Visual styling classes
                cls.startsWith('bg-') ||
                cls.startsWith('border') ||
                cls.startsWith('rounded') ||
                cls.startsWith('shadow') ||
                // Size classes
                cls.includes('-xs') ||
                cls.includes('-sm') ||
                cls.includes('-md') ||
                cls.includes('-lg') ||
                cls.includes('-xl') ||
                cls.includes('-2xl') ||
                // Layout classes
                cls.startsWith('p-') ||
                cls.startsWith('px-') ||
                cls.startsWith('py-') ||
                cls.startsWith('m-') ||
                cls.startsWith('mx-') ||
                cls.startsWith('my-') ||
                cls.startsWith('w-') ||
                cls.startsWith('h-') ||
                cls.includes('flex') ||
                cls.includes('grid') ||
                // TEXT CLASSES: Components with visual variants own their text colors
                // This includes both regular text classes AND smart contrast classes
                cls.startsWith('text-') ||
                cls.startsWith('!text-') ||
                cls.startsWith('font-') ||
                cls.includes('uppercase') ||
                cls.includes('lowercase') ||
                cls.includes('italic') ||
                cls.includes('underline')
        )
}

/**
 * Extract foreground/text related classes from component styles
 * EXCLUDES text color and size classes when visual variant components are present
 * (because those components own their own text styling completely)
 */
function extractForegroundClasses(
    styles: string,
    hasVisualVariantComponent: boolean = false
): string[] {
    return styles
        .split(' ')
        .filter(cls => cls.trim() !== '') // Remove empty strings
        .filter(
            cls =>
                // Font styling classes (always included)
                cls.startsWith('font-') ||
                // Text transformation classes (always included)
                cls.includes('uppercase') ||
                cls.includes('lowercase') ||
                cls.includes('capitalize') ||
                cls.includes('italic') ||
                cls.includes('underline') ||
                cls.includes('line-through') ||
                // Text alignment classes (always included)
                cls.includes('text-left') ||
                cls.includes('text-center') ||
                cls.includes('text-right') ||
                cls.includes('text-justify') ||
                // Text size and color classes (only when no visual variant component)
                (!hasVisualVariantComponent &&
                    (cls.startsWith('text-') || cls.startsWith('!text-')))
        )
        .filter(
            cls =>
                // EXCLUDE component structure classes from foreground
                !cls.startsWith('btn') &&
                !cls.startsWith('input') &&
                !cls.startsWith('card') &&
                !cls.startsWith('modal') &&
                !cls.startsWith('bg-') &&
                !cls.startsWith('border') &&
                !cls.startsWith('rounded') &&
                !cls.startsWith('shadow')
        )
}

/**
 * Extract interaction related classes from component styles
 */
function extractInteractionClasses(styles: string): string[] {
    return styles
        .split(' ')
        .filter(
            cls =>
                cls.includes('hover:') ||
                cls.includes('focus:') ||
                cls.includes('active:') ||
                cls.includes('disabled:') ||
                cls.includes('transition')
        )
}

/**
 * Resolve style conflicts based on component priority
 */
function resolveStyleConflicts(
    classes: string[],
    layerType: 'background' | 'foreground' | 'interaction'
): string[] {
    const uniqueClasses = [...new Set(classes)]

    // For now, just deduplicate - we can add more sophisticated conflict resolution later
    return uniqueClasses
}
