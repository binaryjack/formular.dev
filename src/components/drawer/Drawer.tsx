import { useEffect, useMemo, useRef, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

import { useOnClickOutside } from '../../core/hooks/useOnClickOutside'
import Button from '../button/Button'
import useAppContext from '../context/appContext/AppContext.context'
import { IDebug } from '../context/debug/debug.types'
import Portal from '../portals/Portal'
import { DatePickerContext, IDrawerContext } from './Drawer.context'
import { DrawerDisplayStyleType, DrawerOpenStateType, IDrawerSize } from './Drawer.types'

interface IDrawerProps {
    id: string
    children: React.ReactNode
    drawerOpenState?: DrawerOpenStateType
    onSetOpenState?: (
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        state: DrawerOpenStateType
    ) => void
    debug?: IDebug
}

const Drawer = ({ id, children, drawerOpenState, onSetOpenState, debug }: IDrawerProps) => {
    const [drawerSize, setDrawerSize] = useState<IDrawerSize>({
        width: 0,
        height: 0
    })
    const [drawerDisplayStyle, setDrawerDisplayStyle] = useState<DrawerDisplayStyleType>('bottom')
    const { currentY, middleScreenY, breakpoints, media } = useAppContext()
    const drawerContainerRef = useRef(null)
    const drawerSurfaceDetectorRef = useRef(null)
    const drawerPositionDetectorRef = useRef(null)

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

    const positionY = useMemo(() => {
        const _el = drawerContainerRef.current as unknown as HTMLDivElement
        const _sd = drawerSurfaceDetectorRef.current as unknown as HTMLDivElement

        if (!_el || !_sd) return 0
        console.log('RENDER position')
        return _el.scrollTop + _sd.getBoundingClientRect?.()?.height / 2
    }, [middleScreenY, currentY])

    useEffect(() => {
        const _el = drawerPositionDetectorRef.current as unknown as HTMLDivElement
        if (!media?.media || !_el) return

        /** if height of drawer is greater than half of screen size */

        if (['M', 'L', 'XL', 'XXL'].includes(media?.media)) {
            setDrawerDisplayStyle(
                _el.getBoundingClientRect?.()?.top >= middleScreenY ? 'top' : 'bottom'
            )

            console.log(
                'DETERMIN position',
                _el.getBoundingClientRect?.()?.top,
                middleScreenY,
                currentY
            )
        } else {
            setDrawerDisplayStyle('center')
        }
    }, [middleScreenY, media, drawerSize, positionY])

    useOnClickOutside(drawerContainerRef, handleClose, 'mouseup')

    // tt-transform-origin: ${drawerDisplayStyle === 'bottom' ? 'top' : drawerDisplayStyle === 'top' ? 'bottom' : 'center'};
    const drawerStyle =
        drawerDisplayStyle !== 'center'
            ? `
            #${id}-drawer-slot-${drawerDisplayStyle}-container {
                display: flex;
                position: relative;
            }

             #${id}-drawer-slot-${drawerDisplayStyle}-container 
            .drawer-container {
                display: flex;
                position: absolute;
                width: ${drawerSize.width}px;
                height: ${drawerSize.height}px;
           
                transform-origin: ${drawerDisplayStyle};
                overflow: hidden;
            }
        
            #${id}-drawer-slot-${drawerDisplayStyle}-container 
              .drawer-container.open {
               transform: scaleY(${drawerSize.height}px);
               ${drawerDisplayStyle}:-${drawerSize.height}px;
            }

            #${id}-drawer-slot-${drawerDisplayStyle}-container 
            .drawer-container.closed { 
               transform: scaleY(0);
               ${drawerDisplayStyle}: 0;
            }
    `
            : `
            
              #${id}-drawer-slot-${drawerDisplayStyle}-container {
                display: grid;
                position: relative;
                align-items: center;
                justify-items: center;
                transform-origin: center;
                width: 100%;
            }

              #${id}-drawer-slot-${drawerDisplayStyle}-container 
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

            #${id}-drawer-slot-${drawerDisplayStyle}-container 
              .drawer-container.open {        
               transform: scale(${drawerSize.height}px);
            width:100%;
              
            }

            #${id}-drawer-slot-${drawerDisplayStyle}-container 
            .drawer-container.closed { 
               transform: scale(0);
            }
            `

    return (
        <DatePickerContext.Provider key={id} value={drawerContextDefault}>
            <Portal
                id={id}
                slotName={`drawer-slot-${drawerDisplayStyle}`}
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
            {/** this will stick along the component in order to compute the position from TOP */}
            <div
                id={`debug-${id}`}
                ref={drawerPositionDetectorRef}
                style={{
                    top: `${positionY}px`,
                    display: 'flex',
                    background: debug?.color,
                    width: '100%',
                    height: debug ? '5px' : '0px',
                    position: 'absolute',
                    zIndex: debug ? 99999 : -1
                }}
            />

            {/** this will stick along the component in order to compute the height of the parent component and find the middle */}
            <div
                id={`drawer-parent-height-${id}`}
                ref={drawerSurfaceDetectorRef}
                style={{
                    top: `${positionY}px`,
                    display: 'flex',
                    background: debug?.color,
                    width: debug ? '1px' : '0px',
                    height: '100%',
                    position: 'absolute',
                    zIndex: debug ? 99999 : -1
                }}
            ></div>
        </DatePickerContext.Provider>
    )
}

export default Drawer
