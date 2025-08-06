import { generateComponentStyles } from './generate-component-styles'
import type { IGenericComponentVariants } from './interfaces/i-generic-component-variants'
import type { ComponentType } from './types/component-type.type'

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
