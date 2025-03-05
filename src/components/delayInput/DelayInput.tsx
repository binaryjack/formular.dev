import { useEffect, useRef, useState } from 'react'
import { MdClose } from 'react-icons/md'

import useDebouncer from '../../core/hooks/useDebouncer'
import useKeyBindings from '../../core/hooks/useKeyBindings'

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

    const handleClear = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e?.preventDefault?.()
        setValue('')

        onClearCallback(e)

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
        <>
            <input
                {...rest}
                ref={inputRef}
                onChange={handleOnChanged}
                className={classNames ? classNames : 'base-input'}
                onKeyDown={handleKeyDown}
                tabIndex={tabIndex}
            />
            <button className={`btn-sm-p mr-1`} onClick={handleClear} tabIndex={-1}>
                {<MdClose />}
            </button>
        </>
    )
}

export default DelayInput
