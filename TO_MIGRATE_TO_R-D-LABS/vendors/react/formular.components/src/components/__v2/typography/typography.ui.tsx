import { genericStyling } from 'formular.design.system'
import { ITypographyProps } from './typography.types'

export const Typography = ({
    as: Tag = 'span',
    children,
    disableGenericText = false,
    tabindex = -1,
    variants = { typography: { variant: 'secondary' } },
    ...rest
}: ITypographyProps) => {
    const styling = typeof variants === 'object' ? genericStyling('typography', variants) : null
    const textClasses = styling?.text || (typeof variants === 'string' ? variants : '')
    const textColor = styling?.textColor || ''

    // Combine both text styling and color classes
    const combinedClasses = [textColor, textClasses].filter(Boolean).join(' ')

    return (
        <Tag tabIndex={tabindex} className={combinedClasses} {...rest}>
            {children}
        </Tag>
    )
}
