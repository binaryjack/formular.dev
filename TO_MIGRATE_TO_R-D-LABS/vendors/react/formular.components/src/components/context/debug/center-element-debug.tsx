import { useVisualDebugContext } from './visual-debug.context'
import { VisualLandmark } from './visual-landmark'

export interface ICenterElementDebugProps {
    parentHeight: number
    screenTop: number
    centerScreen: number
}

export const CenterElementDebug = ({
    parentHeight,
    screenTop,
    centerScreen
}: ICenterElementDebugProps) => {
    const { options } = useVisualDebugContext()
    if (!options?.enabled) return <></>
    return (
        <>
            <VisualLandmark
                top={0}
                height={parentHeight}
                orientation="horizontal"
                width={120}
                displayText={`${screenTop}`}
                color={'bg-yellow-500'}
            />

            <VisualLandmark
                top={centerScreen}
                height={2}
                width={0}
                orientation="horizontal"
                displayText={``}
                color={'bg-blue-500'}
            />
        </>
    )
}
