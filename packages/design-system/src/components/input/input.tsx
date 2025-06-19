import React from 'react'

export interface IInputProps {
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
    placeholder?: string
    value?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
    disabled?: boolean
    required?: boolean
    className?: string
    id?: string
    name?: string
    autoComplete?: string
    size?: 'sm' | 'md' | 'lg'
    variant?: 'default' | 'error' | 'success'
}

export const Input = ({
    type = 'text',
    placeholder,
    value,
    onChange,
    onBlur,
    onFocus,
    disabled = false,
    required = false,
    className = '',
    id,
    name,
    autoComplete,
    size = 'md',
    variant = 'default'
}: IInputProps): JSX.Element => {
    const baseClasses =
        'w-full rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'

    const variantClasses = {
        default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
        error: 'border-red-300 focus:border-red-500 focus:ring-red-500',
        success: 'border-green-300 focus:border-green-500 focus:ring-green-500'
    }

    const sizeClasses = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg'
    }

    const classes = [
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white',
        className
    ].join(' ')

    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            disabled={disabled}
            required={required}
            className={classes}
            id={id}
            name={name}
            autoComplete={autoComplete}
        />
    )
}
