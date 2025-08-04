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
    // Button examples
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

    // Form control examples
    primaryCheckbox: generateComponentStyles('checkbox', {
        variant: 'primary',
        size: 'md'
    }),
    // Returns: "checkbox checkbox-md checkbox-primary"

    largeSwitch: generateComponentStyles('switch', {
        variant: 'success',
        size: 'lg'
    }),
    // Returns: "switch switch-lg switch-success"

    // Feedback examples
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
    // BEFORE: Using generateButtonStyles
    // generateButtonStyles('solid', 'primary', 'md')
    //
    // AFTER: Using generic component styles
    // generateComponentStyles('button', { visualVariant: 'solid', variant: 'primary', size: 'md' })
    // BEFORE: Using generateInputStyles
    // generateInputStyles('md', { error: true })
    //
    // AFTER: Using generic component styles
    // generateComponentStyles('input', { size: 'md', state: { error: true } })
    // BEFORE: Using generateCardStyles
    // generateCardStyles('outlined')
    //
    // AFTER: Using generic component styles
    // generateComponentStyles('card', { visualVariant: 'outlined' })
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
    badge: createComponentStyleGenerator('badge'),
    alert: createComponentStyleGenerator('alert')
}

// Then use them like:
// const buttonClasses = performanceOptimizedGenerators.button({ variant: 'primary', size: 'md' })
