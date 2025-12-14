import { generateLayoutClasses } from 'formular.design.system'
import { IFormLayoutProps } from './form-layout.types'

export const FormLayout = ({
    children,
    className = '',
    as: Component = 'div',
    ...layoutVariants
}: IFormLayoutProps) => {
    const { containerClasses, fieldSetClasses } = generateLayoutClasses(layoutVariants)

    return (
        <Component className={`${containerClasses} ${fieldSetClasses} ${className}`}>
            {children}
        </Component>
    )
}
