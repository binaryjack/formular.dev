import { Typography } from '../typography/typography.ui'
import { ILabelProps } from './label.types'

export const Label = ({ htmlFor, text, variants = {}, ...rest }: ILabelProps) => {
    return (
        <label
            htmlFor={htmlFor}
            {...rest}
            className={`text-nowrap select-none mx-1 h-full flex items-center ${rest.className}`}
        >
            <Typography as={'span'} variants={variants}>
                {text}
            </Typography>
        </label>
    )
}
