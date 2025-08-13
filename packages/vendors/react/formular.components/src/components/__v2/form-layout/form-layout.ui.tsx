import { generateLayoutClasses } from 'formular.design.system'
import { IFormLayoutProps } from './form-layout.types'

export const FormLayout = ({
    children,
    className = '',
    as: Component = 'div',
    ...layoutVariants
}: IFormLayoutProps) => {
    const { containerClasses } = generateLayoutClasses(layoutVariants)

    return <Component className={`${containerClasses} ${className}`}>{children}</Component>
}
