import { MouseEvent } from 'react';
declare const useTouchGestureEvents: (isMoving: boolean, isMouseDown: boolean, setIsMoving: React.Dispatch<React.SetStateAction<boolean>>, setIsDragging: React.Dispatch<React.SetStateAction<boolean>>, setIsMouseDown: React.Dispatch<React.SetStateAction<boolean>>, handlePositionResolver: (value: number, force?: boolean) => void) => {
    onMouseUp: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
    onMouseDown: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
    onMouseMove: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
    onMouseLeave: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
    handleOnClick: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
    onGeneralMouseUp: (e: globalThis.MouseEvent) => void;
    onMouseEnter: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
};
export default useTouchGestureEvents;
