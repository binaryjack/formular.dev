import { ElementPositionOutputType } from '../../../style/global.types'
import { Portal } from '../../portals/Portal'
import { DrawerOpenStateType } from '../Drawer.types'

interface IDrawerTopBottomPortalProps {
    id: string
    position: ElementPositionOutputType
    drawerContainerRef: React.RefObject<HTMLDivElement>
    children: React.ReactNode
    width?: string
    height?: string
    drawerOpenState?: DrawerOpenStateType
}
const drawerConditionnalStyle = (id: string, position: ElementPositionOutputType) => {
    return `   
        #${id}-drawer-slot-${position}-container 
        .drawer-container.open {        
            transform: ${position !== 'center' ? `scaleY(1)` : 'scale(1)'};
            ${position}:0;
        }
        #${id}-drawer-slot-${position}-container         
        .drawer-container.closed {           
            transform: ${position !== 'center' ? `scaleY(0)` : 'scale(0)'};
            ${position}:0; 
        }
    `
}

export const DrawerTopBottomPortal = ({
    children,
    drawerContainerRef,
    id,
    position,
    drawerOpenState,
    height,
    width
}: IDrawerTopBottomPortalProps) => (
    <Portal
        id={id}
        slotName={`drawer-slot-${position}`}
        children={
            <>
                <div
                    ref={drawerContainerRef}
                    id={`${id}-drawer-wrapper`}
                    className={`flex absolute drawer-container ${drawerOpenState === 'open' ? 'open' : 'closed'} overflow-hidden`}
                    style={{
                        width: width,
                        height: height,
                        transformOrigin: position,
                        alignItems: 'flex-start',
                        justifyItems: 'unset',
                        alignContent: 'unset',
                        justifyContent: 'unset'
                    }}
                >
                    {children}
                </div>
                {/** I need to render the style this way because we are in a portal context which the component is rendered on demand
                 * because of this, if we use inline style or emotions or styled component we can not achieve this.
                 * we have a state open / close which must be isolated with specific css query that's why we need to append the style here after
                 */}
                <style>{drawerConditionnalStyle(id, position)}</style>
            </>
        }
    />
)
