import { cx } from 'formular.design.system'
import { useSpinnerStyle } from './spinner.style'
import { ISpinnerProps } from './spinner.types'

export const Spinner = ({
    size = 'md',
    color = 'primary',
    overriders,
    className
}: ISpinnerProps) => {
    const { mainSize, strokeSize, frameSize, spinnerStyle } = useSpinnerStyle(
        size,
        color,
        overriders
    )

    const spinnerClasses = cx('af-spinner', 'animate-spin', className)
    return (
        <span
            className={spinnerClasses}
            style={{ width: `${mainSize}px`, height: `${mainSize}px` }}
        >
            <svg style={spinnerStyle.spinner} viewBox={`0 0 ${frameSize} ${frameSize}`}>
                <g
                    fill="none"
                    transform={`translate(${strokeSize} ${strokeSize})`}
                    strokeWidth={strokeSize}
                >
                    <circle
                        style={spinnerStyle.circle}
                        cx={spinnerStyle.circle.cx}
                        cy={spinnerStyle.circle.cy}
                        r={spinnerStyle.circle.r}
                    />

                    <path
                        style={spinnerStyle.path.segment}
                        d={spinnerStyle.path.d}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
            </svg>
        </span>
    )
}
