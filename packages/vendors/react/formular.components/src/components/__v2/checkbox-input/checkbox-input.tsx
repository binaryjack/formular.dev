import { ICheckboxInput } from './checkbox-input.types'

export const CheckboxInput = ({
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
}: ICheckboxInput) => {
    return (
        <input
            id={id}
            data-class="base-checkbox "
            placeholder={placeHolder}
            tabIndex={tabIndex}
            className={className}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onChange={onChange}
            type="checkbox"
            defaultChecked={initialState ? true : false}
            aria-label={placeHolder}
            aria-checked={initialState ? 'true' : 'false'}
            style={{ width: `${size}em`, height: `${size}em` }}
            {...rest}
        />
    )
}
