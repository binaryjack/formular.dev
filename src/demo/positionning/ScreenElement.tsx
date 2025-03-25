import { useState } from 'react'
import Button from '../../components/button/Button'
import { CenterElementDebug } from '../../components/context/debug/CenterElementDebug'
import Drawer from '../../components/drawer/Drawer'
import DrawerContent from '../../components/drawer/Drawer.content'
import { DrawerOpenStateType } from '../../components/drawer/Drawer.types'
import { PortalSlot } from '../../components/portals/PortalSlot'
import { useCenterElementTrigger } from '../../core/hooks/screen/useCenterElement'

interface ScreenElementProps {
    id: string
    name: string
}

export const ScreenElement = ({ id, name }: ScreenElementProps) => {
    const [openState, setOpenState] = useState<DrawerOpenStateType>('closed')

    const handleDrawerOpenState = (
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        state: DrawerOpenStateType
    ) => {
        e?.stopPropagation?.()
        e?.preventDefault?.()
        setOpenState(state)
    }

    const { scrollPosition, elementRef, elementPositionRefs, toggle } =
        useCenterElementTrigger<HTMLDivElement>()

    return (
        <div
            ref={elementRef}
            className={`relative flex flex-col items-center justify-center text-slate-200 font-bold size-64 w-full h-44 bg-orange-800 p-2 my-2`}
        >
            <PortalSlot id={id} slotName={'drawer-slot-center'} />
            <PortalSlot id={id} slotName={'drawer-slot-bottom'} />

            <Drawer
                id={id}
                onSetOpenState={handleDrawerOpenState}
                drawerOpenState={openState}
                position={toggle}
                width="200px"
                height="200px"
            >
                <DrawerContent id={id} />
            </Drawer>

            <CenterElementDebug
                centerScreen={scrollPosition.centerScreen}
                parentHeight={elementPositionRefs.height}
                screenTop={scrollPosition.screenTop}
            />

            <Button
                onClickCallback={(e) => setOpenState('open')}
                id={`${id}-button`}
                title={`${id}-button`}
            >
                Demo Drawer
            </Button>
            <h1>
                {name} | {scrollPosition.centerScreen} |{scrollPosition.triggerPoint} | {toggle}
            </h1>

            <PortalSlot id={id} slotName={'drawer-slot-top'} />
        </div>
    )
}
