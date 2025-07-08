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

    const switchClasses = [
        'switch-button',
        `switch-${orientation}`,
        `switch-button-${size}`,
        `switch-button-${variant}`,
        isOn ? 'switch-on' : 'switch-off'
    ].join(' ')

    const switchTrackClasses = ['switch-button-track', isOn ? 'switch-on' : 'switch-off'].join(' ')
    const switchTrackThumb = ['switch-button-thumb', isOn ? 'switch-on' : 'switch-off'].join(' ')

    return (
        <div
            title={fieldName}
            tabIndex={0}
            className={switchClasses}
            onClick={handleToggle}
            role="switch"
            aria-checked={isOn}
        >
            <div className={switchTrackClasses}>
                <div className={switchTrackThumb} />
            </div>
        </div>
    )
}
