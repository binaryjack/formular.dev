import { cx } from 'formular.design.system'
import { ILabelProps } from './label.types'

export const Label = ({ htmlFor, classNames, text, size, ...rest }: ILabelProps) => {
    return (
        <label
            htmlFor={htmlFor}
            className={cx(
                'ml-2 cursor-pointer select-none',
                'text-secondary-700 font-medium',
                classNames
            )}
            {...rest}
        >
            <span style={{ fontSize: `${size}em` }} className={'text-secondary-700 font-medium'}>
                {text}
            </span>
        </label>
    )
}
