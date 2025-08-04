import { useComputedAnimationState } from '@adapters/react/hooks/use-computed-animation-state'
import { useOnClickOutside } from '@adapters/react/hooks/use-on-click-outside'
import { useToggleableContext } from '../../toggleable/toggleable.context.hook'
import { DrawerContext, IDrawerContext } from '../context/drawer.context'
import { IExpandableDrawerProps } from '../types/drawer.types'

export const ExpandableDrawer = ({
    children,
    id,
    toggleContextId,
    position,
    size = { width: 200, height: 300 }
}: IExpandableDrawerProps) => {
    const { toggleState, setToggleState, containerRef } = useToggleableContext(toggleContextId)
    const { drawerRef } = useComputedAnimationState(toggleState, 'expandable')

    const drawerContext: IDrawerContext = {
        state: toggleState,
        toggle: (state) => {
            console.log(`Drawer ${id} toggled to ${state}`)
        },
        width: `${size.width}px`,
        height: `unset`,
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
                ref={drawerRef}
                className="flex flex-col expandable-drawer-content bg-white border shadow-lg"
            >
                {children}
            </div>
        </DrawerContext.Provider>
    )
}
