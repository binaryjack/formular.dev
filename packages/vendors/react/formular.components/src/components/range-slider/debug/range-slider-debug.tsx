import { MutableRefObject } from 'react'
import { RangePosition, SnapPoint } from '../components/range-slider.types'
import './range-slider-debug.css'

interface RangeSliderDebugProps {
    stepDecimals: number
    snapPoints: MutableRefObject<SnapPoint[]>
    currentSnap: MutableRefObject<SnapPoint>
    position: RangePosition
    isMoving: boolean
    isDragging: boolean
    isMouseDown: boolean
}

const RangeSliderDebug = ({
    stepDecimals,
    snapPoints,
    currentSnap,
    position,
    isMoving,
    isDragging,
    isMouseDown
}: RangeSliderDebugProps) => {
    return (
        <div className={`range-slider-debug`}>
            <div>decimals:..... {stepDecimals}</div>
            <div>snaps:........ {snapPoints?.current.length}</div>
            <div>active snap:.. {JSON.stringify(currentSnap)}</div>
            <div>xPercentage:.. {position.xPercentage}</div>
            <div>step:......... {position.step}</div>
            <div>move:......... {isMoving ? 'M' : 'S'}</div>
            <div>drag:......... {isDragging ? 'D' : 'S'}</div>
            <div>mouse down:... {isMouseDown ? 'D' : 'S'}</div>
            <div className="debug-v">
                {JSON.stringify(
                    snapPoints.current.map((o) => {
                        return {
                            tsL: o.thresholdLow,
                            tsH: o.thresholdHigh
                        }
                    })
                )}
            </div>
        </div>
    )
}

export default RangeSliderDebug
