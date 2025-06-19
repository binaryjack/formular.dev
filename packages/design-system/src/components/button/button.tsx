import React from 'react'

export interface IButtonProps {
    children: React.ReactNode
    onClick?: () => void
    disabled?: boolean
    variant?: 'primary' | 'secondary' | 'outline'
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

export const Button = ({
    children,
    onClick,
    disabled = false,
    variant = 'primary',
    size = 'md',
    className = ''
}: IButtonProps): JSX.Element => {
    const baseClasses =
        'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'

    const variantClasses = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
        outline:
            'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500'
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
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        className
    ].join(' ')

    return (
        <button className={classes} onClick={onClick} disabled={disabled} type="button">
            {children}
        </button>
    )
}
