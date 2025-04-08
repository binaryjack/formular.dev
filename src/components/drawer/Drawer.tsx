/** @jsxImportSource @emotion/react */

import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

import { useObjectRef } from '../../core/hooks/useObjectRef'
import { useOnClickOutside } from '../../core/hooks/useOnClickOutside'
import { ElementPositionOutputType } from '../../style/global.types'
import { Button } from '../button/Button'
import { Portal } from '../portals/Portal'
import { DrawerTopBottomPortal } from './components/Drawer.top-bottom.portal'

import { useEffect } from 'react'
import useMediaScreens from '../../core/hooks/screen/useMediaScreens'
import useAppContext from '../context/appContext/AppContext.context'
import { useToggleableContext } from '../toggleable/Toggleable.context.hook'
import { ToggleableStateType } from '../toggleable/Toggleable.types'
import { DrawerCenterPortal } from './components/Drawer.center.portal'
import { DrawerContext, IDrawerContext } from './components/Drawer.context'

interface IDrawerProps {
    id: string
    children: React.ReactNode
    position: ElementPositionOutputType
    width?: string
    height?: string
}

export const Drawer = ({
    id,
    children,
    position,
    width = '200px',
    height = '100px'
}: IDrawerProps) => {
    const { toggleState, setToggleState } = useToggleableContext()

    const handleDrawerOpenState = (
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        state: ToggleableStateType
    ) => {
        if (state === toggleState) return
        setToggleState(state)
        e?.stopPropagation?.()
        e?.preventDefault?.()
    }

    const { mainRef: drawerContainerRef } = useObjectRef<HTMLDivElement>()

    const { setHoldScroll } = useAppContext()
    const { media } = useMediaScreens()

    useEffect(() => {
        if (position !== 'center') return

        setHoldScroll(toggleState === 'open' ? true : false)
        if (toggleState === 'open') {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflowY = 'auto'
            document.body.style.overflowX = 'hidden'
        }
        return () => {
            setHoldScroll(false)
            document.body.style.overflowY = 'auto'
            document.body.style.overflowX = 'hidden'
        }
    }, [position, toggleState, media])

    const handleClose = () => {
        handleDrawerOpenState({} as React.MouseEvent<HTMLElement, MouseEvent>, 'closed')
    }

    const drawerContextDefault: IDrawerContext = {
        toggleState,
        setOpenState: (
            e: React.MouseEvent<HTMLElement, MouseEvent>,
            state: ToggleableStateType
        ) => {
            console.log('Drawer onSetOpenState', id, state)
            handleDrawerOpenState(e, state)
        },
        drawerWidth: width,
        drawerHeight: height
    }

    useOnClickOutside(drawerContainerRef, handleClose, 'mouseup')

    return (
        <DrawerContext.Provider key={id} value={drawerContextDefault}>
            {position === 'center' ? (
                <DrawerCenterPortal
                    id={'center'}
                    position={position}
                    drawerContainerRef={drawerContainerRef}
                    width={width}
                    height={height}
                    toggleState={toggleState}
                >
                    {children}
                </DrawerCenterPortal>
            ) : (
                <DrawerTopBottomPortal
                    id={id}
                    position={position}
                    drawerContainerRef={drawerContainerRef}
                    width={width}
                    height={height}
                    toggleState={toggleState}
                >
                    {children}
                </DrawerTopBottomPortal>
            )}
            <Portal
                id={id}
                slotName={'toggle-drawer'}
                children={
                    <Button
                        id={`${id}-toggle-drawer-btn`}
                        title={'Toggle Drawer'}
                        variantProperties={{
                            rounded: true,
                            size: 'md',
                            width: '2em',
                            height: '2em',
                            className: 'ml-1'
                        }}
                        onClickCallback={(e) =>
                            handleDrawerOpenState(e, toggleState === 'open' ? 'closed' : 'open')
                        }
                        aria-expanded={toggleState === 'open'}
                        aria-controls={`${id}-drawer-wrapper`}
                        isToggle={toggleState === 'open'}
                    >
                        {toggleState === 'closed' ? <FaChevronDown /> : <FaChevronUp />}
                    </Button>
                }
            />
        </DrawerContext.Provider>
    )
}
