import useDebouncer from '@adapters/react/hooks/use-debouncer'
import { cx, generateComponentStyles } from 'formular.design.system'
import { useState } from 'react'
import { IBaseInputProps } from './base-input.types'

export const BaseInput = ({
    id,
    dataClass,
    placeHolder,
    changeDelay = 500,
    tabIndex,
    onKeyDown,
    onKeyUp,
    onChangeCallback,
    variants = {},
    ...rest
}: IBaseInputProps) => {
    const {
        variant = 'primary',
        size = 'md',
        weight = 'normal',
        rounded = false,
        width = 'unset',
        height = 'unset',
        className = ''
    } = variants

    const classStyle = cx(
        generateComponentStyles('input', {
            variant,
            size,
            weight,
            rounded,
            width,
            height
        }) // This already includes 'btn' base class
    )

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
            className={`${classStyle}`}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onChange={handleOnChange}
            {...rest}
            type="text"
        />
    )
}
