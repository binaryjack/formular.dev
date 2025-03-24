import { VisualLandmark } from './VisualLandmark'

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
    return (
        <>
            <VisualLandmark
                top={0}
                height={parentHeight}
                width={120}
                displayText={`${screenTop}`}
                color={'bg-yellow-500'}
            />

            <VisualLandmark
                top={centerScreen}
                height={2}
                width={0}
                displayText={``}
                color={'bg-blue-500'}
            />
        </>
    )
}
