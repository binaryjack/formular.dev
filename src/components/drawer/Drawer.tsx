/** @jsxImportSource @emotion/react */

import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

import { useObjectRef } from '../../core/hooks/useObjectRef'
import { useOnClickOutside } from '../../core/hooks/useOnClickOutside'
import { ElementPositionOutputType } from '../../style/global.types'
import { Button } from '../button/Button'
import { Portal } from '../portals/Portal'
import { DrawerTopBottomPortal } from './components/Drawer.top-bottom.portal'

import { DrawerCenterPortal } from './components/Drawer.center.portal'
import { DrawerContext, IDrawerContext } from './components/Drawer.context'
import { DrawerOpenStateType } from './Drawer.types'
import { useDrawerIsOverflowing } from './hooks/useDrawerIsOverflowing'

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

export const Drawer = ({
    id,
    children,
    position,
    drawerOpenState,
    onSetOpenState,
    width = '200px',
    height = '100px'
}: IDrawerProps) => {
    const { buttonRefObject, mainRef: drawerContainerRef } = useObjectRef<HTMLDivElement>()

    const handleClose = () => {
        onSetOpenState?.({} as React.MouseEvent<HTMLElement, MouseEvent>, 'closed')
    }

    const { isOverflowingAt } = useDrawerIsOverflowing(
        buttonRefObject,
        position,
        drawerOpenState,
        height
    )

    const drawerContextDefault: IDrawerContext = {
        onSetOpenState,
        drawerOpenState,
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
                    drawerOpenState={drawerOpenState}
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
                    drawerOpenState={drawerOpenState}
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
                            onSetOpenState?.(e, drawerOpenState === 'open' ? 'closed' : 'open')
                        }
                        aria-expanded={drawerOpenState === 'open'}
                        aria-controls={`${id}-drawer-wrapper`}
                        isToggle={drawerOpenState === 'open'}
                    >
                        {drawerOpenState === 'closed' ? <FaChevronDown /> : <FaChevronUp />}
                    </Button>
                }
            />
        </DrawerContext.Provider>
    )
}
