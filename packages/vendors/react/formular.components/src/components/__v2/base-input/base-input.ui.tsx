import useDebouncer from '@adapters/react/hooks/use-debouncer'
import { cx, genericStyle } from 'formular.design.system'
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
        rounded = false,
        width = 'unset',
        height = 'unset',
        className = '',
        typography = {}
    } = variants

    const { weight = 'normal' } = typography

    const classStyle = cx(
        genericStyle({
            componentType: 'input',
            variant,
            size,
            rounded,
            width,
            height,
            typography: {
                weight
            }
        }) // Now using V2 unified API with typography separation
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
