import type { ComponentSizeType, ComponentVariantType } from 'formular.design.system'
import { cx } from 'formular.design.system'
import { useEffect, useState } from 'react'

interface IToggleButtonProps {
    id: string
    name: string
    toggle: boolean
    children: React.ReactNode
    disabled?: boolean
    size?: ComponentSizeType
    variant?: ComponentVariantType
    className?: string
    width?: string
    height?: string
    onToggle: (id: string, newState: boolean) => void
}

export const ToggleButton = ({
    id,
    name,
    toggle,
    className,
    children,
    size = 'md',
    variant = 'primary',
    onToggle,
    width = '34px',
    height = '34px',
    disabled = false
}: IToggleButtonProps) => {
    const [isOn, setIsOn] = useState(toggle)

    useEffect(() => {
        setIsOn(toggle)
    }, [toggle])

    const handleToggle = () => {
        if (disabled) return
        const newState = !isOn
        setIsOn(newState)
        onToggle(id, newState)
    }

    const btnBaseClasses = cx(
        'toggle-button-wrapper',
        isOn ? `toggle-button-${variant}-active` : `toggle-button-${variant}`,
        `btn-${size}`, // Use standard button size classes
        'rounded',
        'cursor-pointer',
        'transition-all',
        'duration-150',
        'ease-in-out',
        {
            'opacity-50 cursor-not-allowed': disabled
        },
        className
    )

    return (
        <button
            disabled={disabled}
            aria-disabled={disabled ? 'true' : 'false'}
            id={id}
            title={name}
            type="button"
            onClick={handleToggle}
            style={{
                maxWidth: width,
                height: height
            }}
            className={btnBaseClasses}
        >
            <div className="content">{children}</div>
        </button>
    )
}
