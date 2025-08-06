/**
 * Generic Component Styles Examples
 *
 * This file demonstrates how to use the new generic component style generator
 * with your existing IComponentVariants interface and React components.
 */

import {
    componentSupportsFeature,
    createComponentStyleGenerator,
    generateButtonComponentStyles,
    generateButtonStyles,
    generateButtonStylesV2,
    generateCardComponentStyles,
    generateComponentStyles,
    generateInputComponentStyles,
    getAvailableComponentTypes
} from './generic-component-styles'

// ===================================================================
// EXAMPLES: Using the generic component style generator
// ===================================================================

// Example 1: Direct usage with generateComponentStyles
export const directUsageExamples = {
    // Button examples using the generic API
    primaryButton: generateComponentStyles('button', {
        visualVariant: 'solid',
        variant: 'primary',
        size: 'md'
    }),
    // Returns: "btn btn-md btn-primary"

    outlineSecondaryButton: generateComponentStyles('button', {
        visualVariant: 'outline',
        variant: 'secondary',
        size: 'lg',
        rounded: false
    }),
    // Returns: "btn btn-lg btn-outline-secondary rounded-none"

    // Button examples using the NEW developer-friendly API
    solidButton: generateButtonStyles('solid', 'primary', 'md'),
    // Returns: "btn btn-md btn-primary"

    outlineButton: generateButtonStyles('outline', 'danger', 'lg'),
    // Returns: "btn btn-lg btn-outline-danger"

    ghostButton: generateButtonStyles('ghost', 'success', 'sm'),
    // Returns: "btn btn-sm btn-ghost-success"

    // Button examples using the V2 interface (recommended for new code)
    buttonV2Example1: generateButtonStylesV2({
        type: 'solid',
        color: 'primary',
        size: 'md'
    }),
    // Returns: "btn btn-md btn-primary"

    buttonV2Example2: generateButtonStylesV2({
        type: 'outline',
        color: 'warning',
        size: 'xl',
        rounded: false,
        className: 'custom-btn'
    }),
    // Returns: "btn btn-xl btn-outline-warning rounded-none custom-btn"

    // Input examples
    errorInput: generateComponentStyles('input', {
        size: 'md',
        state: {
            error: true,
            focused: false,
            hovered: false,
            pressed: false,
            disabled: false,
            loading: false
        }
    }),
    // Returns: "input input-md input-error"

    largeInput: generateComponentStyles('input', {
        size: 'lg',
        className: 'custom-input'
    }),
    // Returns: "input input-lg custom-input"

    // Card examples
    elevatedCard: generateComponentStyles('card', {
        visualVariant: 'elevated'
    }),
    // Returns: "card card-elevated"

    outlinedCard: generateComponentStyles('card', {
        visualVariant: 'outlined',
        className: 'shadow-sm'
    }),
    // Returns: "card card-outlined shadow-sm"

    // Form control examples (using base classes only - no variants in current CSS)
    primaryCheckbox: generateComponentStyles('checkbox', {}),
    // Returns: "checkbox"

    largeSwitch: generateComponentStyles('switch', {})
    // Returns: "switch"

    // Feedback examples - commented out until CSS files are created
    /*
    dangerBadge: generateComponentStyles('badge', {
        visualVariant: 'solid',
        variant: 'danger',
        size: 'sm'
    }),
    // Returns: "badge badge-sm badge-danger"

    warningAlert: generateComponentStyles('alert', {
        visualVariant: 'outline',
        variant: 'warning'
    })
    // Returns: "alert alert-outline-warning"
    */
}

// Example 2: Using pre-created generators for better performance
export const preCreatedGeneratorExamples = {
    button: generateButtonComponentStyles({
        visualVariant: 'ghost',
        variant: 'info',
        size: 'xl'
    }),
    // Returns: "btn btn-xl btn-ghost-info"

    input: generateInputComponentStyles({
        size: 'sm',
        state: {
            focused: true,
            error: false,
            disabled: false,
            hovered: false,
            pressed: false,
            loading: false
        }
    }),
    // Returns: "input input-sm input-focused"

    card: generateCardComponentStyles({
        visualVariant: 'elevated',
        className: 'hover:shadow-lg transition-shadow'
    })
    // Returns: "card card-elevated hover:shadow-lg transition-shadow"
}

// Example 3: Creating custom generators for your components
export const customGenerators = {
    // Custom button generator with defaults
    generatePrimaryButton: createComponentStyleGenerator('button'),

    // Custom input generator
    generateFormInput: createComponentStyleGenerator('input'),

    // Custom card generator
    generateContentCard: createComponentStyleGenerator('card')
}

// Usage of custom generators
export const customGeneratorUsage = {
    primaryButton: customGenerators.generatePrimaryButton({
        variant: 'primary',
        size: 'md'
    }),

    formInput: customGenerators.generateFormInput({
        size: 'lg',
        state: {
            error: true,
            focused: false,
            disabled: false,
            hovered: false,
            pressed: false,
            loading: false
        }
    }),

    contentCard: customGenerators.generateContentCard({
        visualVariant: 'outlined'
    })
}

// ===================================================================
// INTEGRATION EXAMPLES: How to use with your existing React components
// ===================================================================

/**
 * Example: Updated Button component using generic styles
 * This shows how to replace your existing generateButtonStyles with the generic version
 */
/*
// Before (using generateButtonStyles):
import { generateButtonStyles } from 'formular.design.system'

const btnBaseClasses = cx(
    generateButtonStyles('solid', variant, size),
    {
        'state-disabled': disabled,
        'state-loading': loading,
    },
    !rounded && 'rounded-none',
    textCase,
    className
)

// After (using generic component styles):
import { generateComponentStyles } from 'formular.design.system'

const btnBaseClasses = cx(
    generateComponentStyles('button', {
        visualVariant: 'solid',
        variant,
        size,
        rounded,
        textCase,
        className,
        state: {
            disabled: disabled || false,
            loading: loading || false,
            error: false,
            focused: false,
            hovered: false,
            pressed: false
        }
    })
)
*/

/**
 * Example: Creating a new Input component using generic styles
 */
/*
import { generateComponentStyles } from 'formular.design.system'
import { IComponentVariants } from '../component-variants'

interface IInputProps {
    id: string
    variants?: Partial<IComponentVariants>
    error?: boolean
    disabled?: boolean
    // ... other props
}

export const Input = ({ id, variants = {}, error, disabled, ...props }: IInputProps) => {
    const {
        size = 'md',
        variant = 'primary',
        className = ''
    } = variants

    const inputClasses = generateComponentStyles('input', {
        size,
        className,
        state: {
            error: error || false,
            disabled: disabled || false,
            focused: false,
            hovered: false,
            pressed: false,
            loading: false
        }
    })

    return (
        <input
            id={id}
            className={inputClasses}
            disabled={disabled}
            {...props}
        />
    )
}
*/

/**
 * Example: Creating a Card component using generic styles
 */
/*
import { generateComponentStyles } from 'formular.design.system'
import { IComponentVariants } from '../component-variants'

interface ICardProps {
    id: string
    children: React.ReactNode
    variants?: Partial<IComponentVariants>
    elevated?: boolean
    outlined?: boolean
}

export const Card = ({ id, children, variants = {}, elevated, outlined }: ICardProps) => {
    const { className = '' } = variants
    
    let visualVariant: 'solid' | 'outlined' | 'elevated' = 'solid'
    if (elevated) visualVariant = 'elevated'
    if (outlined) visualVariant = 'outlined'

    const cardClasses = generateComponentStyles('card', {
        visualVariant,
        className
    })

    return (
        <div id={id} className={cardClasses}>
            {children}
        </div>
    )
}
*/

// ===================================================================
// UTILITY EXAMPLES: Working with component configurations
// ===================================================================

export const utilityExamples = {
    // Get all available component types
    availableTypes: getAvailableComponentTypes(),
    // Returns: ['button', 'btn', 'input', 'textarea', 'card', 'checkbox', 'radio', ...]

    // Check if components support specific features
    buttonSupportsVisualVariants: componentSupportsFeature('button', 'visualVariants'), // true
    inputSupportsVisualVariants: componentSupportsFeature('input', 'visualVariants'), // false
    cardSupportsColorVariants: componentSupportsFeature('card', 'colorVariants'), // false
    checkboxSupportsSizeVariants: componentSupportsFeature('checkbox', 'sizeVariants') // true
}

// ===================================================================
// MIGRATION GUIDE: From existing generators to generic generator
// ===================================================================

/**
 * Migration examples showing how to replace existing style generators
 */
export const migrationExamples = {
    // ===================================================================
    // BUTTON MIGRATION EXAMPLES
    // ===================================================================

    // OLD: Using generateButtonStyles from component-styles.ts
    // generateButtonStyles('solid', 'primary', 'md')
    //
    // NEW: Using developer-friendly API (recommended)
    // generateButtonStyles('solid', 'primary', 'md')
    //
    // NEW: Using V2 interface (most explicit)
    // generateButtonStylesV2({ type: 'solid', color: 'primary', size: 'md' })
    //
    // NEW: Using generic component styles (most flexible)
    // generateComponentStyles('button', { visualVariant: 'solid', variant: 'primary', size: 'md' })

    // Example conversions:
    buttonExample1: {
        // Before: generateButtonStyles('outline', 'danger', 'lg')
        newApi: generateButtonStyles('outline', 'danger', 'lg'),
        newV2: generateButtonStylesV2({ type: 'outline', color: 'danger', size: 'lg' }),
        newGeneric: generateComponentStyles('button', {
            visualVariant: 'outline',
            variant: 'danger',
            size: 'lg'
        })
    },

    // ===================================================================
    // INPUT MIGRATION EXAMPLES
    // ===================================================================

    // OLD: Using generateInputStyles from component-styles.ts
    // generateInputStyles('md', { error: true })
    //
    // NEW: Using generic component styles (recommended)
    // generateComponentStyles('input', { size: 'md', state: { error: true } })

    inputExample1: {
        // Before: generateInputStyles('lg', { focused: true, error: false })
        newGeneric: generateComponentStyles('input', {
            size: 'lg',
            state: {
                focused: true,
                error: false,
                disabled: false,
                hovered: false,
                pressed: false,
                loading: false
            }
        })
    },

    // ===================================================================
    // CARD MIGRATION EXAMPLES
    // ===================================================================

    // OLD: Using generateCardStyles from component-styles.ts
    // generateCardStyles('outlined')
    //
    // NEW: Using generic component styles (recommended)
    // generateComponentStyles('card', { visualVariant: 'outlined' })

    cardExample1: {
        // Before: generateCardStyles('elevated')
        newGeneric: generateComponentStyles('card', { visualVariant: 'elevated' })
    }
}

// ===================================================================
// PERFORMANCE TIP: Pre-create generators for frequently used components
// ===================================================================

// Create these once and reuse them throughout your application
export const performanceOptimizedGenerators = {
    button: createComponentStyleGenerator('button'),
    input: createComponentStyleGenerator('input'),
    card: createComponentStyleGenerator('card'),
    checkbox: createComponentStyleGenerator('checkbox'),
    radio: createComponentStyleGenerator('radio'),
    typography: createComponentStyleGenerator('typography'),
    text: createComponentStyleGenerator('text')
}

// Then use them like:
// const buttonClasses = performanceOptimizedGenerators.button({ variant: 'primary', size: 'md' })
