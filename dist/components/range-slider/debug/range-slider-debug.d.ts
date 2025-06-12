import { MutableRefObject } from 'react';
import { RangePosition, SnapPoint } from '../components/range-slider.types';
interface RangeSliderDebugProps {
    stepDecimals: number;
    snapPoints: MutableRefObject<SnapPoint[]>;
    currentSnap: MutableRefObject<SnapPoint>;
    position: RangePosition;
    isMoving: boolean;
    isDragging: boolean;
    isMouseDown: boolean;
}
declare const RangeSliderDebug: ({ stepDecimals, snapPoints, currentSnap, position, isMoving, isDragging, isMouseDown }: RangeSliderDebugProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export default RangeSliderDebug;
