import { useState } from 'react'
import { AppBreakPointSizesType, orientationTypes, VariantNameType } from '../../style/global.types'
import './SwitchButton.base.css'
import './SwitchButton.danger.css'
import './SwitchButton.info.css'
import './SwitchButton.primary.css'
import './SwitchButton.secondary.css'
import './SwitchButton.sizes.css'
import './SwitchButton.success.css'
import './SwitchButton.warning.css'

// filepath: e:/Sources/SignalsPatternsReact/src/components/switchButton/SwitchButton.tsx

interface ISwitchButtonProps {
    fieldName: string
    orientation?: orientationTypes
    size?: AppBreakPointSizesType
    variant?: VariantNameType
}

export const SwitchButton = ({
    fieldName,
    orientation = 'horizontal',
    size = 'md',
    variant = 'primary'
}: ISwitchButtonProps) => {
    const [isOn, setIsOn] = useState(false)

    const handleToggle = () => {
        setIsOn((prev) => !prev)
    }

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
