import './spinner.css'

interface SpinnerProps {
    width?: number
    height?: number
    strokeWidth?: number
    strokeOppacity?: number
    strokeColor?: string
    activeColor?: string
    frameWidth?: number
    frameHeight?: number
}

const Spinner = ({
    frameWidth = 42,
    frameHeight = 42,
    width = 100,
    height = 100,
    strokeOppacity = 0.25,
    strokeWidth = 3,
    strokeColor = '#979797',
    activeColor = '#2E3A4B'
}: SpinnerProps) => {
    const Styles = {
        spinner: {
            animation: 'spinner-animation 900ms linear infinite',
            display: 'flex',
            width: `${width}px`,
            height: `${height}px`
        },

        circle: {
            stroke: strokeColor,
            strokeOpacity: strokeOppacity
        },

        segment: {
            stroke: activeColor
        }
    }

    return (
        <span className={`af-spinner`} style={{ width: `${width}px`, height: `${height}px` }}>
            <svg style={Styles.spinner} viewBox={`0 0 ${frameWidth} ${frameHeight}`}>
                <g
                    fill="none"
                    transform={`translate(${strokeWidth} ${strokeWidth})`}
                    strokeWidth={strokeWidth}
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
