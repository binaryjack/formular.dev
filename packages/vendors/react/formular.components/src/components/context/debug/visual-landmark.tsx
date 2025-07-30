import { useVisualDebugContext } from './visual-debug.context'

export interface ICenterElementDebugProps {
    height: number
    width?: number
    top?: number
    left?: number
    orientation: 'horizontal' | 'vertical'
    displayText: string
    color: string
}

export const VisualLandmark = ({
    height,
    width,
    top,
    left,
    orientation,
    displayText,
    color
}: ICenterElementDebugProps) => {
    const { options } = useVisualDebugContext()
    if (!options?.enabled) return <></>
    return (
        <div
            className={`absolute flex items-center justify-center  h-auto ${color} z-modal top-0 `}
            style={{
                top: orientation === 'horizontal' && top ? `${top}px` : 0,
                left: orientation === 'vertical' && left ? `${left}px` : 0,
                height: height ? `${height}px` : '100%',
                width: width ? `${width}px` : '100%'
            }}
        >
            <h1>{displayText}</h1>
        </div>
    )
}
