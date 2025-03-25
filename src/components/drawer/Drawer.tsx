/** @jsxImportSource @emotion/react */

import { useRef } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

import { css } from '@emotion/react'
import { ElementPositionOutputType } from '../../core/hooks/screen/screen.types'
import { useOnClickOutside } from '../../core/hooks/useOnClickOutside'
import Button from '../button/Button'
import { Portal } from '../portals/Portal'
import { DrawerContext, IDrawerContext } from './Drawer.context'
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

const drawerContainerStyle = (
    position: ElementPositionOutputType,
    width: string,
    height: string
) => css`
    --display: flex;
    --position: ${position === 'center' ? 'relative' : 'absolute'};
    width: ${width};
    height: ${height};
    transform-origin: ${position};

    &.open {
        transform: ${position === 'center' ? 'scale(1)' : 'scaleY(1)'};
        ${position !== 'center' && `${position}: 0;`}
    }

    &.closed {
        transform: ${position === 'center' ? 'scale(0)' : 'scaleY(0)'};
        ${position !== 'center' && `${position}: 0;`}
    }
`

const drawerConditionnalStyle = (
    id: string,
    position: ElementPositionOutputType,
    width: string,
    height: string
) => {
    return `
            #${id}-drawer-slot-${position}-container {
                display: ${position === 'center' ? 'grid' : 'flex'};
                position: relative;
                background: red;
                width: 100%;
                height: 1px;                               
                ${position === 'center' ? `align-items: center;` : ''}    
                ${position === 'center' ? `justify-items: center;` : ''}    
                transform-origin: ${position === 'center' ? 'center' : 'unset'};
            }
            #${id}-drawer-slot-${position}-container 
            .drawer-container {
                display: flex;
                position: absolute;
                width: ${width};
                height: ${height};
                transform-origin:${position === 'center' ? position : 'unset'};  

                align-items: ${position === 'center' ? 'center' : 'flex-start'};
                justify-items: ${position === 'center' ? 'center' : 'unset'};
                align-content: ${position === 'center' ? 'center' : 'unset'};
                justify-content: ${position === 'center' ? 'center' : 'unset'};
            }     


             #${id}-drawer-slot-${position}-container 
            .drawer-container.open {
                transform: scaleY(1);
                ${position !== 'center' ? `${position}:0;` : ''}             
            }

            #${id}-drawer-slot-${position}-container 
            .drawer-container.closed { 
                transform: scaleY(0);
                ${position !== 'center' ? `${position}:0;` : ''}    
            }
    
    `
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

    return (
        <DrawerContext.Provider key={id} value={drawerContextDefault}>
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
                        <style>{drawerConditionnalStyle(id, position, width, height)}</style>
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
                        aria-expanded={drawerOpenState === 'open'}
                        aria-controls={`${id}-drawer-wrapper`}
                    >
                        {drawerOpenState === 'closed' ? <FaChevronDown /> : <FaChevronUp />}
                    </Button>
                }
            />
        </DrawerContext.Provider>
    )
}

export default Drawer
