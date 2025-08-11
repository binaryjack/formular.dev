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
    const classStyle = genericStyle({
        componentTypes: ['input'],
        ...variants
    }) // Now using V2 unified API with typography separation

    // Debug logging
    if (process.env.NODE_ENV === 'development') {
        console.log('🔍 BaseInput render:', {
            id,
            variants,
            generatedClasses: {
                backGround: classStyle.backGround,
                text: classStyle.text,
                borders: classStyle.borders,
                states: Object.values(classStyle.states)
            }
        })
    }

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
            className={cx(
                classStyle.backGround,
                classStyle.text,
                classStyle.borders,
                ...Object.values(classStyle.states)
            )}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onChange={handleOnChange}
            {...rest}
            type="text"
        />
    )
}
