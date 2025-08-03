import { cx } from 'formular.design.system'
import { IRadioOptionProps } from './radio-option.types'

export const RadioOption = ({
    id,
    placeHolder,
    tabIndex,
    className,
    initialState,
    onKeyDown,
    onKeyUp,
    onChange,
    size,
    ...rest
}: IRadioOptionProps) => {
    return (
        <input
            id={id}
            data-class="base-radio "
            placeholder={placeHolder}
            tabIndex={tabIndex}
            className={cx(
                'form-radio',
                'text-primary-600 border-secondary-300',
                'focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50',
                'transition duration-150 ease-in-out',
                'base-radio',
                className
            )}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onChange={onChange}
            type="radio"
            defaultChecked={initialState ? true : false}
            aria-label={placeHolder}
            aria-checked={initialState ? 'true' : 'false'}
            style={{ width: `${size}em`, height: `${size}em` }}
            {...rest}
        />
    )
}
