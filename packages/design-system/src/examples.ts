/**
 * Integration Examples
 *
 * Examples showing how to use the design system with formular.components
 */

import {
    cn,
    colors,
    createCssVars,
    generateButtonStyles,
    generateInputStyles,
    generateValidationStyles,
    spacing
} from './index'

// Example 1: Using design tokens directly
export const exampleUsage = {
    // Access color values
    primaryColor: colors.primary[500],
    dangerColor: colors.danger[500],
    successColor: colors.success[600],

    // Access spacing values
    smallSpacing: spacing[2],
    mediumSpacing: spacing[4],
    largeSpacing: spacing[8],

    // Generate CSS custom properties
    cssVars: createCssVars({
        primary: colors.primary[500],
        'spacing-md': spacing[4],
        'border-radius': '0.5rem'
    })
}

// Example 2: Style generators for component classes
export const componentStyles = {
    // Button styles
    primaryButton: generateButtonStyles('solid', 'primary', 'md'),
    outlineButton: generateButtonStyles('outline', 'secondary', 'sm'),
    ghostButton: generateButtonStyles('ghost', 'danger', 'lg'),

    // Input styles
    defaultInput: generateInputStyles('md'),
    errorInput: generateInputStyles('md', {
        error: true,
        focused: false,
        hovered: false,
        pressed: false,
        disabled: false,
        loading: false
    }),
    focusedInput: generateInputStyles('lg', {
        focused: true,
        hovered: false,
        pressed: false,
        disabled: false,
        error: false,
        loading: false
    }),
    disabledInput: generateInputStyles('sm', {
        disabled: true,
        focused: false,
        hovered: false,
        pressed: false,
        error: false,
        loading: false
    }),

    // Validation styles
    errorMessage: generateValidationStyles('error'),
    successMessage: generateValidationStyles('success'),
    warningMessage: generateValidationStyles('warning')
}

// Example 3: Class name utilities
export const classNameExamples = {
    // Conditional classes
    dynamicButton: (isActive: boolean, isDisabled: boolean) =>
        cn('btn-base btn-primary btn-size-md', {
            'opacity-50': isDisabled,
            'bg-primary-700': isActive,
            'cursor-not-allowed': isDisabled
        }),

    // Field with validation
    fieldClasses: (hasError: boolean, hasSuccess: boolean) =>
        cn('field-container', {
            'field-error': hasError,
            'field-success': hasSuccess
        })
}

// Example 4: Integration with existing formular.components patterns
export const formularIntegration = {
    // Button wrapper matching existing patterns
    buttonWrapper: cn(
        'btn-wrapper', // Existing formular.components class
        'btn-base', // Design system base
        'transition-all', // Design system utilities
        'duration-150'
    ),

    // Input container matching existing patterns
    inputContainer: cn(
        'input-container', // Existing formular.components class
        'field-container', // Design system container
        'relative' // Design system utilities
    ),

    // Validation matching existing patterns
    validationSuccess: cn(
        'validation-success', // Existing class name preserved
        'field-success-text', // Design system styling
        'flex' // Design system utilities
    ),

    validationError: cn(
        'validation-error', // Existing class name preserved
        'field-error-text', // Design system styling
        'flex' // Design system utilities
    )
}

// Example 5: CSS-in-JS usage (for inline styles)
export const inlineStyleExamples = {
    primaryButtonStyle: {
        backgroundColor: colors.primary[500],
        color: colors.white,
        padding: `${spacing[2]} ${spacing[4]}`,
        borderRadius: '0.5rem',
        fontSize: '1rem',
        fontWeight: '500',
        transition: 'all 150ms ease-in-out'
    },

    inputFieldStyle: {
        borderColor: colors.neutral[300],
        backgroundColor: colors.white,
        padding: spacing[3],
        borderRadius: '0.5rem',
        fontSize: '1rem',
        outline: 'none'
    },

    errorInputStyle: {
        borderColor: colors.danger[500],
        boxShadow: `0 0 0 3px ${colors.danger[500]}20`
    }
}

// Example 6: Responsive usage (for CSS-in-JS or styled-components)
export const responsiveExamples = {
    // Mobile-first responsive padding
    responsivePadding: {
        padding: spacing[2], // Base (mobile)
        '@media (min-width: 640px)': {
            padding: spacing[4] // sm and up
        },
        '@media (min-width: 1024px)': {
            padding: spacing[6] // lg and up
        }
    },

    // Responsive text sizes
    responsiveText: {
        fontSize: '0.875rem', // Base (mobile)
        '@media (min-width: 768px)': {
            fontSize: '1rem' // md and up
        }
    }
}
