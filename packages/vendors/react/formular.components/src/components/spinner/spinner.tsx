import type { ColorVariant, Size } from 'formular.design.system'
import { colorUtils, cx } from 'formular.design.system'

interface SpinnerProps {
    size?: Size
    color?: ColorVariant
    width?: number
    height?: number
    strokeWidth?: number
    strokeOpacity?: number
    strokeColor?: string
    activeColor?: string
    frameWidth?: number
    frameHeight?: number
    className?: string
}

const sizeMap: Record<Size, { width: number; height: number; strokeWidth: number }> = {
    xs: { width: 12, height: 12, strokeWidth: 2 },
    sm: { width: 16, height: 16, strokeWidth: 2 },
    md: { width: 20, height: 20, strokeWidth: 3 },
    lg: { width: 24, height: 24, strokeWidth: 3 },
    xl: { width: 32, height: 32, strokeWidth: 4 }
}

const Spinner = ({
    size = 'md',
    color = 'primary',
    width,
    height,
    strokeWidth,
    strokeOpacity = 0.25,
    strokeColor,
    activeColor,
    frameWidth = 42,
    frameHeight = 42,
    className
}: SpinnerProps) => {
    const sizeConfig = sizeMap[size]
    const finalWidth = width ?? sizeConfig.width
    const finalHeight = height ?? sizeConfig.height
    const finalStrokeWidth = strokeWidth ?? sizeConfig.strokeWidth

    const finalStrokeColor = strokeColor ?? colorUtils.getColor('neutral', 300)
    const finalActiveColor = activeColor ?? colorUtils.getColor(color, 500)

    const spinnerClasses = cx('af-spinner', 'animate-spin', className)

    const Styles = {
        spinner: {
            display: 'flex',
            width: `${finalWidth}px`,
            height: `${finalHeight}px`
        },

        circle: {
            stroke: finalStrokeColor,
            strokeOpacity: strokeOpacity
        },

        segment: {
            stroke: finalActiveColor
        }
    }

    return (
        <span
            className={spinnerClasses}
            style={{ width: `${finalWidth}px`, height: `${finalHeight}px` }}
        >
            <svg style={Styles.spinner} viewBox={`0 0 ${frameWidth} ${frameHeight}`}>
                <g
                    fill="none"
                    transform={`translate(${finalStrokeWidth} ${finalStrokeWidth})`}
                    strokeWidth={finalStrokeWidth}
                >
                    <circle style={Styles.circle} cx="18" cy="18" r="18" />

                    <path
                        style={Styles.segment}
                        d="M36 18c0-9.94-8.06-18-18-18"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
            </svg>
        </span>
    )
}
export default Spinner
