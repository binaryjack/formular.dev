import { useEffect, useState } from 'react'

import {
    // filepath: e:/Sources/SignalsPatternsReact/src/components/toggle/Toggle.tsx
    AppBreakPointSizesType,
    TextCaseType,
    TextWeightType,
    VariantNameType
} from '../../style/global.types'

import { sizeConverter } from '@adapters/react/hooks/screen/utils/screen.utils'
import './toggle-button.css'

interface IToggleButtonProps {
    id: string
    name: string
    toggle: boolean
    children: React.ReactNode
    disabled?: boolean
    size?: AppBreakPointSizesType
    variant?: VariantNameType
    textCase?: TextCaseType
    weight?: TextWeightType
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
    size = 'sm',
    variant = 'primary',
    textCase = 'normal-case',
    weight = 'normal',
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

    const btnBaseClasses = [
        isOn
            ? `border-3 border-solid toggle-button-${variant}-active`
            : `border-2 border-solid toggle-button-${variant}`,
        `${sizeConverter?.(size)}`,
        `${textCase}`,
        `${weight}`,
        'rounded',
        'cursor-pointer',
        'transition-all',
        'duration-150',
        'ease-in-out'
    ].join(' ')

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
            className={`toggle-button-wrapper ${btnBaseClasses} ${className}`}
        >
            {children}
        </button>
    )
}
