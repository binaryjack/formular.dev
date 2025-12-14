import { generateFlexLayoutClasses } from 'formular.design.system'
import { IFormLayoutProps } from './form-layout.types'

/**
 * FlexFormLayout - Alternative to FormLayout using flexbox instead of CSS Grid
 *
 * Key differences from FormLayout:
 * - Uses flexbox with flex-wrap for natural column heights
 * - Allows accordion content to expand without affecting other columns
 * - More flexible for content with varying heights
 * - Still supports responsive breakpoints and all layout options
 *
 * Use when you need:
 * - Different heights per column (accordion, variable content)
 * - Natural content flow without grid constraints
 * - Flexible layouts that adapt to content
 *
 * Use regular FormLayout when you need:
 * - Precise grid alignment
 * - Uniform row heights across columns
 * - Traditional form grid layouts
 */
export const FlexFormLayout = ({
    children,
    className = '',
    as: Component = 'div',
    ...layoutVariants
}: IFormLayoutProps) => {
    const { containerClasses } = generateFlexLayoutClasses(layoutVariants)

    return <Component className={`${containerClasses} ${className}`}>{children}</Component>
}
