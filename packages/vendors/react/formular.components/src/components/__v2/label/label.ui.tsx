import { Typography } from '../typography/typography.ui'
import { ILabelProps } from './label.types'

export const Label = ({ htmlFor, text, variants = {}, tabindex = -1, ...rest }: ILabelProps) => {
    return (
        <label
            tabIndex={tabindex}
            htmlFor={htmlFor}
            {...rest}
            className={`text-nowrap select-none mx-1 h-full flex items-center ${rest.className}`}
        >
            <Typography tabindex={tabindex} as={'span'} variants={variants}>
                {text}
            </Typography>
        </label>
    )
}
