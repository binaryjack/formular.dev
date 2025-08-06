import { Typography } from '../typography/typography.ui'
import { ILabelProps } from './label.types'

export const Label = ({ htmlFor, text, variants = {}, ...rest }: ILabelProps) => {
    return (
        <label htmlFor={htmlFor} {...rest}>
            <Typography as={'span'} variants={variants}>
                {text}
            </Typography>
        </label>
    )
}
