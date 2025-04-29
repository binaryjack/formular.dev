/** @jsxImportSource @emotion/react */

import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

import { useObjectRef } from '../../core/hooks/use-object-ref'
import { useOnClickOutside } from '../../core/hooks/use-on-click-outside'
import { ElementPositionOutputType } from '../../style/global.types'
import { Button } from '../button/button'
import { Portal } from '../portals/portals'
import { DrawerTopBottomPortal } from './components/drawer.top-bottom.portal'

import { useCallback, useEffect } from 'react'
import useMediaScreens from '../../core/hooks/screen/useMediaScreens'
import useAppContext from '../context/app-context/app-context.context'
import { useToggleableContext } from '../toggleable/toggleable.context.hook'

import { DrawerCenterPortal } from './components/drawer.center.portal'
import { DrawerContext, IDrawerContext } from './components/drawer.context'

import { ToggleableStateType } from '../../core/base/toggleable-base-element/toggleable-base-element'
import './drawer.css'

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
    const { mainRef: drawerContainerRef, castedRefObject } = useObjectRef<HTMLDivElement>()

    const handleDrawerOpenState = (
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        state: ToggleableStateType
    ) => {
        if (state === toggleState) return
        setToggleState(state)
        e?.stopPropagation?.()
        e?.preventDefault?.()
    }

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

    const handleAnimationEnded = useCallback(() => {
        if (toggleState === 'closed') {
            setToggleState('idle')
        }
    }, [toggleState, castedRefObject])

    useEffect(() => {
        if (!castedRefObject) return
        castedRefObject.addEventListener('animationend', handleAnimationEnded)
        // console.log('ADD EVENT LISTENER')
        return () => {
            castedRefObject.removeEventListener('animationend', handleAnimationEnded)
            // console.log('REMOVE EVENT LISTENER')
        }
    }, [castedRefObject, toggleState])

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
            {toggleState !== 'idle' && position === 'center' ? (
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
                toggleState !== 'idle' && (
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
                )
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
                            handleDrawerOpenState(
                                e,
                                ['closed', 'idle'].includes(toggleState) ? 'open' : 'closed'
                            )
                        }
                        aria-expanded={toggleState === 'open'}
                        aria-controls={`${id}-drawer-wrapper`}
                        isToggle={toggleState === 'open'}
                    >
                        {['closed', 'idle'].includes(toggleState) ? (
                            <FaChevronDown />
                        ) : (
                            <FaChevronUp />
                        )}
                    </Button>
                }
            />
        </DrawerContext.Provider>
    )
}
