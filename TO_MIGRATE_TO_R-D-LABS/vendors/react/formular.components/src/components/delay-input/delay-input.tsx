import useDebouncer from '@adapters/react/hooks/use-debouncer'
import useKeyBindings from '@adapters/react/hooks/use-key-bindings'
import { cx } from 'formular.design.system'
import { useEffect, useRef, useState } from 'react'

interface IDelayInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    delay: number
    onChangeCallback: (value: string) => void
    onClearCallback: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    canGotFocus?: boolean
    classNames?: string
    tabIndex?: number
}

const DelayInput = ({
    classNames,
    delay,
    canGotFocus,
    onChangeCallback,
    onClearCallback,
    tabIndex = -1,
    ...rest
}: IDelayInputProps) => {
    const [value, setValue] = useState('')
    useDebouncer(value, 500, () => onChangeCallback(value))
    const inputRef = useRef<HTMLInputElement>(null)
    const handleOnChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.target.value === value) return
        setValue(e.target.value)
    }

    const handleClear = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e?.preventDefault?.()
        setValue('')

        const inputElement = inputRef.current as unknown as HTMLInputElement
        if (!inputElement) return
        inputElement.value = ''
    }

    const { handleKeyDown } = useKeyBindings<HTMLInputElement>({
        onDeleteCallback: handleClear
    })

    useEffect(() => {
        if (!canGotFocus) return
        const inputElement = inputRef.current as unknown as HTMLInputElement
        if (!inputElement) return
        inputElement?.focus()
    }, [canGotFocus])

    return (
        <input
            ref={inputRef}
            onChange={handleOnChanged}
            className={
                classNames
                    ? cx(classNames)
                    : cx('w-full outline-none p-2 border border-secondary-200 rounded')
            }
            onKeyDown={handleKeyDown}
            tabIndex={tabIndex}
            {...rest}
        />
    )
}

export default DelayInput
