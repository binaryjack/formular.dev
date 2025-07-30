import { useScrollingContext } from '@components/context/scrolling/scrolling.context'
import { ElementPositionType } from 'formular.design.system'
import { useEffect, useRef, useState } from 'react'
import { useToggleableContext } from '../toggleable/toggleable.context.hook'
import { calculateSmartPosition } from './computed/calculate-smart-position'
import { getPositionStyles } from './computed/get-position-styles'
import { DrawerContext, IDrawerContext } from './drawer.context'
import { IDrawerProps } from './drawer.types'

export const Drawer = ({
    owner,
    children,
    id,
    toggleContextId,
    position,
    size = { width: 200, height: 300 }
}: IDrawerProps) => {
    const { toggleState, setToggleState } = useToggleableContext(toggleContextId)
    const { screenProperties } = useScrollingContext()
    const drawerHolderRef = useRef<HTMLDivElement>(null)
    const [isAnimating, setIsAnimating] = useState(false)
    const [shouldRender, setShouldRender] = useState(toggleState === 'open')
    const [calculatedPosition, setCalculatedPosition] = useState<ElementPositionType>(position)

    const drawerContext: IDrawerContext = {
        state: 'idle',
        toggle: (state) => {
            console.log(`Drawer ${id} toggled to ${state}`)
        },
        width: `${size.width}px`,
        height: `${size.height}px`,
        toggleContextId: toggleContextId
    }

    useEffect(() => {
        const element = drawerHolderRef?.current as unknown as HTMLElement

        if (!element || !screenProperties) return

        const rect = element.getBoundingClientRect()

        // Calculate smart position only if position is 'center' or not specified
        if (position === 'center' || !position) {
            const smartPosition = calculateSmartPosition(
                size,
                rect,
                screenProperties.width,
                screenProperties.height
            )
            setCalculatedPosition(smartPosition)
        } else {
            setCalculatedPosition(position)
        }
    }, [screenProperties, position, size])

    // Handle animation lifecycle
    useEffect(() => {
        if (toggleState === 'open') {
            setShouldRender(true)
            setIsAnimating(true)
        } else if (toggleState === 'closed') {
            setIsAnimating(true)
            // Don't immediately hide - wait for animation to complete
            const timer = setTimeout(() => {
                setShouldRender(false)
                setIsAnimating(false)
            }, 300) // Match animation duration

            return () => clearTimeout(timer)
        }
    }, [toggleState])

    if (!setToggleState) {
        console.error(`Drawer ${id} component must be used within a Toggleable context`)
        return null
    }

    return (
        <DrawerContext.Provider value={drawerContext}>
            <div
                id={id}
                className={`drawer relative flex flex-row ${position}`}
                ref={drawerHolderRef}
            >
                <div className="flex flex-1">{owner}</div>

                {shouldRender && (
                    <div
                        className={`drawer-content flex bg-white border shadow-lg ${
                            isAnimating ? 'animate' : ''
                        }`}
                        style={getPositionStyles(
                            toggleState,
                            size,
                            drawerHolderRef,
                            calculatedPosition
                        )}
                        onAnimationEnd={() => setIsAnimating(false)}
                    >
                        {children}
                    </div>
                )}
            </div>
        </DrawerContext.Provider>
    )
}
