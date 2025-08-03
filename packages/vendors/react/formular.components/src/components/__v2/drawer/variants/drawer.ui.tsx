import { useComputedAnimationState } from '@adapters/react/hooks/use-computed-animation-state'
import { useComputedDrawerPosition } from '@adapters/react/hooks/use-computed-drawer-position'
import { useOnClickOutside } from '@adapters/react/hooks/use-on-click-outside'
import { useToggleableContext } from '../../toggleable/toggleable.context.hook'
import { getPositionStyles } from '../computed/get-position-styles'
import { DrawerContext, IDrawerContext } from '../context/drawer.context'
import { IDrawerProps } from '../types/drawer.types'

export const Drawer = ({
    owner,
    children,
    id,
    toggleContextId,
    position,
    size = { width: 200, height: 300 }
}: IDrawerProps) => {
    const { toggleState, setToggleState, containerRef } = useToggleableContext(toggleContextId)
    const { calculatedPosition, drawerHolderRef } = useComputedDrawerPosition(position, size)
    const { drawerRef } = useComputedAnimationState(toggleState)

    const drawerContext: IDrawerContext = {
        state: toggleState,
        toggle: (state) => {
            console.log(`Drawer ${id} toggled to ${state}`)
        },
        width: `${size.width}px`,
        height: `${size.height}px`,
        toggleContextId: toggleContextId
    }

    useOnClickOutside(drawerRef, (event) => {
        // Check if the click was inside the toggleable container
        if (containerRef?.current?.contains?.(event.target as Node)) {
            return // Don't close if clicking inside the toggleable container
        }

        if (toggleState === 'open') {
            setToggleState('closed')
        }
    })

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

                <div
                    ref={drawerRef}
                    className="drawer-content absolute bg-white border shadow-lg"
                    style={getPositionStyles(size, calculatedPosition)}
                >
                    {children}
                </div>
            </div>
        </DrawerContext.Provider>
    )
}
