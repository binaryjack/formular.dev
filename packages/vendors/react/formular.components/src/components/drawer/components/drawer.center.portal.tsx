import { ElementPositionType } from 'formular.design.system'
import { ToggleableStateType } from 'formular.dev.lib'
import { Portal } from '../../portals/portals'

interface IDrawerCenterPortalProps {
    id: string
    position: ElementPositionType
    drawerContainerRef: React.RefObject<HTMLDivElement>
    children: React.ReactNode
    width?: string
    height?: string
    toggleState?: ToggleableStateType
}

export const DrawerCenterPortal = ({
    children,
    drawerContainerRef,
    id,
    position,
    toggleState,
    height,
    width
}: IDrawerCenterPortalProps) => (
    <Portal
        id={id}
        slotName={`drawer-slot-${position}`}
        children={
            <>
                <div
                    id={`${id}-overlay`}
                    className={`drawer-slot-overlay`}
                    style={{
                        animation:
                            toggleState === 'open'
                                ? `openOverlay 0.3s ease-in-out forwards`
                                : toggleState === 'closed'
                                  ? `closeOverlay 0.3s ease-in-out forwards`
                                  : 'idle forwards'
                    }}
                />
                <div
                    ref={drawerContainerRef}
                    id={`${id}-drawer-wrapper`}
                    className={`flex absolute drawer-container overflow-hidden`}
                    style={{
                        width: width,
                        height: height,
                        transformOrigin: position,
                        alignItems: 'flex-start',
                        justifyItems: 'unset',
                        alignContent: 'unset',
                        justifyContent: 'unset',
                        animation:
                            toggleState === 'open'
                                ? `openDrawer 0.3s ease-in-out forwards`
                                : toggleState === 'closed'
                                  ? `closeDrawer 0.3s ease-in-out forwards`
                                  : 'idle forwards'
                    }}
                >
                    {children}
                </div>
            </>
        }
    />
)
