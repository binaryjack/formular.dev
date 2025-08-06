import { cx, generateComponentStyles } from 'formular.design.system'
import { ILabelProps } from './label.types'

export const Label = ({ htmlFor, text, variants = {}, ...rest }: ILabelProps) => {
    const labelStyle = generateComponentStyles('typography', variants)
    const labelClassName = cx(labelStyle, rest.className)

    return (
        <label htmlFor={htmlFor} className={labelClassName} {...rest}>
            <span>{text}</span>
        </label>
    )
}
