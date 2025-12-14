import { useEffect, useState } from 'react'
import { ISwitchButtonOptions } from './switch-button.types'

interface ISwitchButtonProps {
    fieldName: string
    options: ISwitchButtonOptions
    onToggle: (value: boolean) => void
    isToggle: boolean
}

export const SwitchButton = ({
    fieldName,
    options = {
        orientation: 'horizontal',
        size: 'md',
        variant: 'primary'
    },
    onToggle,
    isToggle
}: ISwitchButtonProps) => {
    const { orientation, size, variant } = options
    const [isOn, setIsOn] = useState(false)
    const handleToggle = () => {
        const output = !isOn
        setIsOn(output)
        onToggle(output)
    }
    useEffect(() => {
        setIsOn(isToggle)
    }, [isToggle])

    // Map size values to match design system CSS classes
    // All sizes now supported: 2xs, xs, sm, md (default), lg, xl, 2xl
    const getSizeClass = (size: string = 'md') => {
        return size // All sizes are now available in the design system
    }

    const sizeClass = getSizeClass(size)

    const switchClasses = [
        'switch',
        sizeClass !== 'md' ? `switch-${sizeClass}` : '', // md is default, no class needed
        variant !== 'primary' ? `switch-${variant}` : '' // primary is default
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <div
            title={fieldName}
            tabIndex={0}
            className={switchClasses}
            onClick={handleToggle}
            role="switch"
            aria-checked={isOn}
            data-checked={isOn}
        >
            <div className="switch-track">
                <div className="switch-thumb" />
            </div>
        </div>
    )
}
