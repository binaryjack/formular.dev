import { useAnimationState } from '@adapters/react/hooks/use-animation-state'
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
    const { animationStates, drawerRef } = useAnimationState(toggleState)
    const { screenProperties } = useScrollingContext()
    const drawerHolderRef = useRef<HTMLDivElement>(null)

    const [calculatedPosition, setCalculatedPosition] = useState<ElementPositionType>(position)

    const drawerContext: IDrawerContext = {
        state: toggleState,
        toggle: (state) => {
            console.log(`Drawer ${id} toggled to ${state}`)
        },
        width: `${size.width}px`,
        height: `${size.height}px`,
        toggleContextId: toggleContextId
    }

    // Get animation class based on toggle state and position
    const getAnimationClass = (state: string, pos: ElementPositionType): string => {
        // Add a base class to handle animation cancellation
        const baseClass = 'transition-transform transition-opacity duration-300 ease-in-out'

        if (state === 'opening') {
            switch (pos) {
                case 'left':
                    return `${baseClass} animate-drawer-slide-in-left`
                case 'right':
                    return `${baseClass} animate-drawer-slide-in-right`
                case 'top':
                case 'top-left':
                case 'top-right':
                    return `${baseClass} animate-drawer-slide-in-bottom`
                case 'bottom':
                case 'bottom-left':
                case 'bottom-right':
                    return `${baseClass} animate-drawer-slide-in-top`
                case 'center':
                default:
                    return `${baseClass} animate-fade-in`
            }
        }
        if (state === 'closing') {
            switch (pos) {
                case 'left':
                    return `${baseClass} animate-drawer-slide-out-left`
                case 'right':
                    return `${baseClass} animate-drawer-slide-out-right`
                case 'top':
                case 'top-left':
                case 'top-right':
                    return `${baseClass} animate-drawer-slide-out-bottom`
                case 'bottom':
                case 'bottom-left':
                case 'bottom-right':
                    return `${baseClass} animate-drawer-slide-out-top`
                case 'center':
                default:
                    return `${baseClass} animate-fade-out`
            }
        }
        return baseClass
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

    if (!setToggleState) {
        console.error(`Drawer ${id} component must be used within a Toggleable context`)
        return null
    }

    return (
        <DrawerContext.Provider value={drawerContext}>
            <div
                id={id}
                className={`drawer  relative flex flex-row ${position}`}
                ref={drawerHolderRef}
            >
                <div className="flex flex-1   ">{owner}</div>
                {animationStates.showDrawer && (
                    <div
                        ref={drawerRef}
                        className={`drawer-content absolute bg-white border shadow-lg ${getAnimationClass(animationStates.animation, calculatedPosition)}`}
                        style={getPositionStyles(size, calculatedPosition)}
                    >
                        {children}
                    </div>
                )}
            </div>
        </DrawerContext.Provider>
    )
}
