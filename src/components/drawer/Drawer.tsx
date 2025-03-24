import { useRef, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

import { ElementPositionOutputType } from '../../core/hooks/screen/screen.types'
import { useOnClickOutside } from '../../core/hooks/useOnClickOutside'
import Button from '../button/Button'
import { Portal } from '../portals/Portal'
import { DatePickerContext, IDrawerContext } from './Drawer.context'
import { DrawerOpenStateType, IDrawerSize } from './Drawer.types'

interface IDrawerProps {
    id: string
    children: React.ReactNode
    position: ElementPositionOutputType
    drawerOpenState?: DrawerOpenStateType
    onSetOpenState?: (
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        state: DrawerOpenStateType
    ) => void
}

const Drawer = ({ id, children, position, drawerOpenState, onSetOpenState }: IDrawerProps) => {
    const [drawerSize, setDrawerSize] = useState<IDrawerSize>({
        width: 0,
        height: 0
    })

    const drawerContainerRef = useRef(null)

    const reportDraweSize = (size: IDrawerSize) => {
        setDrawerSize(size)
    }

    const handleClose = () => {
        onSetOpenState?.({} as React.MouseEvent<HTMLElement, MouseEvent>, 'closed')
    }

    const drawerContextDefault: IDrawerContext = {
        onSetOpenState,
        drawerOpenState,
        reportDraweSize
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
                height: 100%;
            }

             #${id}-drawer-slot-${position}-container 
            .drawer-container {
                display: flex;
                position: absolute;
                width: ${drawerSize.width}px;
                height: ${drawerSize.height}px;
           
                transform-origin: ${position};
             
            }
        
            #${id}-drawer-slot-${position}-container 
              .drawer-container.open {
               transform: scaleY(${drawerSize.height}px);
               ${position}:-${drawerSize.height}px;
            }

            #${id}-drawer-slot-${position}-container 
            .drawer-container.closed { 
               transform: scaleY(0);
               ${position}: 0;
            }
    `
            : `
            
              #${id}-drawer-slot-${position}-container {
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
                max-width: ${drawerSize.width}px;
                height: ${drawerSize.height}px;
              
            }

            #${id}-drawer-slot-${position}-container 
              .drawer-container.open {        
               transform: scale(${drawerSize.height}px);
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
