import useDebouncer from '@adapters/react/hooks/use-debouncer'
import { useState } from 'react'
import { IBaseInputProps } from './base-input.types'

export const BaseInput = ({
    id,
    dataClass,
    placeHolder,
    changeDelay = 500,
    tabIndex,
    className,
    onKeyDown,
    onKeyUp,
    onChangeCallback,
    variants,
    ...rest
}: IBaseInputProps) => {
    const [value, setValue] = useState('')
    useDebouncer(value, changeDelay, () => onChangeCallback?.(value))
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.target.value === value) return
        setValue(e.target.value)
    }

    return (
        <input
            id={id}
            data-class={dataClass}
            placeholder={placeHolder}
            tabIndex={tabIndex}
            className={className}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onChange={handleOnChange}
            {...rest}
            type="text"
        />
    )
}
