import { clx, genericStyle } from 'formular.design.system'
import { ITypographyProps } from './typography.types'

export const Typography = ({
    as: Tag = 'span',
    children,
    tabindex = -1,
    variants = { typography: { variant: 'secondary' } },
    ...rest
}: ITypographyProps) => {
    const textClasses =
        typeof variants === 'object'
            ? clx(
                  ...(genericStyle({
                      componentTypes: ['typography'],
                      ...variants
                  })?.text ?? [])
              )
            : variants

    return (
        <Tag tabIndex={tabindex} className={`${textClasses} `} {...rest}>
            {children}
        </Tag>
    )
}
