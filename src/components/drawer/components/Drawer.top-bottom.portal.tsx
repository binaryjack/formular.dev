import { ToggleableStateType } from '@core/fields/toggleable-base-element/toggleable-base-element'
import { ElementPositionOutputType } from '../../../style/global.types'
import { Portal } from '../../portals/portals'

interface IDrawerTopBottomPortalProps {
    id: string
    position: ElementPositionOutputType
    drawerContainerRef: React.RefObject<HTMLDivElement>
    children: React.ReactNode
    width?: string
    height?: string
    toggleState?: ToggleableStateType
}

export const DrawerTopBottomPortal = ({
    children,
    drawerContainerRef,
    id,
    position,
    toggleState,
    height,
    width
}: IDrawerTopBottomPortalProps) => (
    <Portal
        id={id}
        slotName={`drawer-slot-${position}`}
        children={
            <div
                ref={drawerContainerRef}
                id={`${id}-drawer-wrapper`}
                className={`flex absolute drawer-container ${toggleState === 'open' ? 'open' : 'closed'} overflow-hidden  ${position}-0`}
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
                            ? `openDrawerY 0.3s ease-in-out forwards`
                            : toggleState === 'closed'
                              ? `closeDrawerY 0.3s ease-in-out forwards`
                              : 'idle forwards'
                }}
            >
                {children}
            </div>
        }
    />
)
