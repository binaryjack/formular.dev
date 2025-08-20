import useDebouncer from '@adapters/react/hooks/use-debouncer'
import { clx, genericStyle } from 'formular.design.system'
import { forwardRef, useState } from 'react'
import { IBaseInputProps } from './base-input.types'

export const BaseInput = forwardRef<HTMLInputElement, IBaseInputProps>(
    (
        {
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
        }: IBaseInputProps,
        ref
    ) => {
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

        const clbackGround = classStyle.backGround
        const cltext = classStyle.text
        const clborders = classStyle.borders
        const clstates = Object.values(classStyle.states).filter((o) => !!o)

        return (
            <input
                id={id}
                data-class={dataClass}
                placeholder={placeHolder}
                tabIndex={tabIndex}
                className={clx(...clbackGround, ...cltext, ...clborders, ...clstates)}
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
                onChange={handleOnChange}
                {...rest}
                type="text"
                ref={ref}
            />
        )
    }
)
