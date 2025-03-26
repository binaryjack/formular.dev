import { useVisualDebugContext } from './VisualDebug.context'

export interface ICenterElementDebugProps {
    height: number
    width?: number
    top: number
    displayText: string
    color: string
}

export const VisualLandmark = ({
    height,
    width,
    top,
    displayText,
    color
}: ICenterElementDebugProps) => {
    const { options } = useVisualDebugContext()
    if (!options?.enabled) return <></>
    return (
        <div
            className={`absolute flex items-center justify-center  h-auto ${color} z-40 top-0 `}
            style={{
                top: `${top}px`,
                height: `${height}px`,
                width: width ? `${width}px` : '100%',
                left: 0
            }}
        >
            <h1>{displayText}</h1>
        </div>
    )
}
