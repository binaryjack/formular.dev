import type { ComponentSizeType } from '../../types'
import type { IComponentState } from '../../types/interfaces'
import { generateComponentStyles } from './generate-component-styles'
import type { IButtonVariants } from './interfaces/i-button-variants'

/**
 * Generate button styles using the new IButtonVariants interface
 * This is the preferred approach for new code
 */
export const generateButtonStyles = (variants: IButtonVariants = {}): string => {
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
    const visualVariant = variant === 'default' ? 'solid' : variant
    return generateComponentStyles('card', {
        visualVariant: visualVariant as any
    })
}
