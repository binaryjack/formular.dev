import { cx, genericStyle } from 'formular.design.system'
import { ITypographyProps } from './typography.types'

export const Typography = ({
    as: Tag = 'span',
    children,
    variants = {},
    ...rest
}: ITypographyProps) => {
    const textClasses =
        typeof variants === 'object'
            ? cx(
                  genericStyle({
                      componentTypes: ['typography'],
                      ...variants
                  })?.text
              )
            : variants

    return (
        <Tag className={textClasses} {...rest}>
            {children}
        </Tag>
    )
}
