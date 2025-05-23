import React, { useState } from 'react'

interface IMaskedInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
    mask: string // Mask format, e.g., '999-999-9999'
    value?: string
    onChange?: (value: string) => void
}

const MaskedInput = ({
    mask,
    value = '',
    onChange,
    placeholder,
    className,
    ...rest
}: IMaskedInputProps) => {
    const [inputValue, setInputValue] = useState(value)

    const formatValue = (rawValue: string): string => {
        let formatted = ''
        let maskIndex = 0

        for (let i = 0; i < rawValue.length; i++) {
            if (maskIndex >= mask.length) break

            if (mask[maskIndex] === '9') {
                if (/\d/.test(rawValue[i])) {
                    formatted += rawValue[i]
                    maskIndex++
                }
            } else {
                formatted += mask[maskIndex]
                maskIndex++
                i-- // Recheck the current character
            }
        }

        return formatted
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, '') // Remove non-numeric characters
        const formattedValue = formatValue(rawValue)
        setInputValue(formattedValue)
        if (onChange) onChange(formattedValue)
    }

    return (
        <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder={placeholder}
            className={className}
            {...rest}
        />
    )
}

export default MaskedInput
