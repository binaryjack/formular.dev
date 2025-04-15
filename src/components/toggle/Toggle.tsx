import { useState } from 'react'
import { sizeConverter } from '../../core/hooks/screen/utils/screen.utils'
import {
    // filepath: e:/Sources/SignalsPatternsReact/src/components/toggle/Toggle.tsx
    AppBreakPointSizesType,
    TextCaseType,
    TextWeightType,
    VariantNameType
} from '../../style/global.types'

interface IToggleButtonProps {
    id: string
    name: string
    toggle: boolean
    size?: AppBreakPointSizesType
    variant?: VariantNameType
    textCase?: TextCaseType
    weight?: TextWeightType
    onToggle: (id: string, newState: boolean) => void
}

export const ToggleButton = ({
    id,
    name,
    toggle,
    size = 'sm',
    variant = 'primary',
    textCase = 'normal-case',
    weight = 'normal',
    onToggle
}: IToggleButtonProps) => {
    const [isOn, setIsOn] = useState(toggle)

    const handleToggle = () => {
        const newState = !isOn
        setIsOn(newState)
        onToggle(id, newState)
    }

    const btnBaseClasses = [
        `btn-${variant}`,
        `${sizeConverter?.(size)}`,
        `${textCase}`,
        `${weight}`,
        'rounded',
        'cursor-pointer',
        'transition-all',
        'duration-150',
        'ease-in-out',
        isOn ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'
    ].join(' ')

    return (
        <button
            id={id}
            title={name}
            type="button"
            className={`btn-wrapper ${btnBaseClasses}`}
            onClick={handleToggle}
        >
            {name}
        </button>
    )
}
