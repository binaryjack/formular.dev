import { MouseEvent, useCallback } from 'react'

// I intentionnaly use:
// e.stopPropagation()
// e.preventDefault()
// because is do not want bubbl
const useTouchGestureEvents = (
    isMoving: boolean,
    isMouseDown: boolean,
    setIsMoving: React.Dispatch<React.SetStateAction<boolean>>,
    setIsDragging: React.Dispatch<React.SetStateAction<boolean>>,
    setIsMouseDown: React.Dispatch<React.SetStateAction<boolean>>,
    handlePositionResolver: (value: number, force?: boolean) => void
) => {
    const handleOnClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        handlePositionResolver(e.clientX, true)
        e.stopPropagation()
        e.preventDefault()
    }

    const onMouseDown = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        setIsMoving(true)
        setIsDragging(true)
        setIsMouseDown(true)
        e.stopPropagation()
        e.preventDefault()
    }

    const handleDismissMoveAndDrag = useCallback(
        (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent> | globalThis.MouseEvent) => {
            setIsDragging(false)
            setIsMoving(false)
            setIsMouseDown(false)
            e.stopPropagation()
            e.preventDefault()
        },
        []
    )

    const onMouseUp = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        handleDismissMoveAndDrag(e)
    }

    const onGeneralMouseUp = (e: globalThis.MouseEvent) => {
        handleDismissMoveAndDrag(e)
    }

    const onMouseEnter = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        setIsMoving(true)
        e.stopPropagation()
        e.preventDefault()
    }

    const onMouseLeave = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        setIsMoving(false)
        e.stopPropagation()
        e.preventDefault()
    }

    const onMouseMove = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        handleDragBehavior(e)
        e.stopPropagation()
        e.preventDefault()
    }

    const handleDragBehavior = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        if (isMoving || isMouseDown) {
            handlePositionResolver(e.clientX)
        }
        e.stopPropagation()
        e.preventDefault()
    }

    return {
        onMouseUp,
        onMouseDown,
        onMouseMove,
        onMouseLeave,
        handleOnClick,
        onGeneralMouseUp,
        onMouseEnter
    }
}

export default useTouchGestureEvents
