import { IBaseInputProps } from './base-input.types'

export const BaseInput = ({
    id,
    dataClass,
    placeHolder,
    tabIndex,
    className,
    onKeyDown,
    onKeyUp,
    onChange,
    ...rest
}: IBaseInputProps) => {
    return (
        <input
            id={id}
            data-class={dataClass}
            placeholder={placeHolder}
            tabIndex={tabIndex}
            className={className}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onChange={onChange}
            {...rest}
            type="text"
        />
    )
}
