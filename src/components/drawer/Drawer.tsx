import { useRef } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

import { ElementPositionOutputType } from '../../core/hooks/screen/screen.types'
import { useOnClickOutside } from '../../core/hooks/useOnClickOutside'
import Button from '../button/Button'
import { Portal } from '../portals/Portal'
import { DatePickerContext, IDrawerContext } from './Drawer.context'
import { DrawerOpenStateType } from './Drawer.types'

interface IDrawerProps {
    id: string
    children: React.ReactNode
    position: ElementPositionOutputType
    drawerOpenState?: DrawerOpenStateType
    onSetOpenState?: (
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        state: DrawerOpenStateType
    ) => void
    width?: string
    height?: string
}

const Drawer = ({
    id,
    children,
    position,
    drawerOpenState,
    onSetOpenState,
    width = '200px',
    height = '100px'
}: IDrawerProps) => {
    const drawerContainerRef = useRef(null)

    const handleClose = () => {
        onSetOpenState?.({} as React.MouseEvent<HTMLElement, MouseEvent>, 'closed')
    }

    const drawerContextDefault: IDrawerContext = {
        onSetOpenState,
        drawerOpenState,
        drawerWidth: width,
        drawerHeight: height
    }

    useOnClickOutside(drawerContainerRef, handleClose, 'mouseup')

    const drawerStyle =
        position !== 'center'
            ? `
            #${id}-drawer-slot-${position}-container {
                display: flex;
                position: relative;
                background: red;
                width: 100%;
                height: 1px; 

            }

             #${id}-drawer-slot-${position}-container 
            .drawer-container {
                display: flex;
                position: absolute;
                width: ${width};
                height: ${height};
                border: 6px solid gray;
                transform-origin:${position};    
            }
        
            #${id}-drawer-slot-${position}-container 
              .drawer-container.open {
               transform: scaleY(1);
               ${position}:0;
               
            }

            #${id}-drawer-slot-${position}-container 
            .drawer-container.closed { 
               transform: scaleY(0);
               ${position}:0;
            }`
            : `#${id}-drawer-slot-${position}-container {
                display: grid;
                position: relative;
                align-items: center;
                justify-items: center;
                transform-origin: center;
                width: 100%;
            }

              #${id}-drawer-slot-${position}-container 
                .drawer-container {
                display: flex;
                align-items:center;
                justify-items: center;
                align-content: center;
                justify-content: center;
                position: absolute;      
                max-width: ${width}px;
                height: ${height}px;
              
            }

            #${id}-drawer-slot-${position}-container 
              .drawer-container.open {        
               transform: scale(${height}px);
            width:100%;
              
            }

            #${id}-drawer-slot-${position}-container 
            .drawer-container.closed { 
               transform: scale(0);
            }
            `

    return (
        <DatePickerContext.Provider key={id} value={drawerContextDefault}>
            <Portal
                id={id}
                slotName={`drawer-slot-${position}`}
                children={
                    <>
                        <div
                            ref={drawerContainerRef}
                            id={`${id}-drawer-wrapper`}
                            className={`drawer-container  ${drawerOpenState === 'open' ? 'open' : 'closed'}`}
                        >
                            {children}
                        </div>
                        <style>{drawerStyle}</style>
                    </>
                }
            />
            <Portal
                id={id}
                slotName={'close-drawer'}
                children={
                    <Button
                        id={`${id}-close-drawer-btn`}
                        title={'Close Drawer'}
                        variant={{ rounded: true, size: 'md' }}
                        onClickCallback={(e) =>
                            onSetOpenState?.(e, drawerOpenState === 'open' ? 'closed' : 'open')
                        }
                    >
                        {drawerOpenState === 'closed' ? <FaChevronDown /> : <FaChevronUp />}
                    </Button>
                }
            />
        </DatePickerContext.Provider>
    )
}

export default Drawer
