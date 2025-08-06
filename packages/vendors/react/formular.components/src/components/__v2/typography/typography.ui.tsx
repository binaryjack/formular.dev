import { genericStyle } from 'formular.design.system'
import { ITypographyProps } from './typography.types'

export const Typography = ({
    as: Tag = 'span',
    children,
    variants = {},
    ...rest
}: ITypographyProps) => {
    const textClasses = genericStyle({
        componentType: 'typography',
        ...variants
    })

    return (
        <Tag className={textClasses} {...rest}>
            {children}
        </Tag>
    )
}
