import { useState } from 'react'
import { CenterElementDebug } from '../../components/context/debug/CenterElementDebug'
import { Drawer } from '../../components/drawer/Drawer'
import { DrawerContent } from '../../components/drawer/Drawer.content'
import { DrawerToggle } from '../../components/drawer/Drawer.toggle'
import { DrawerOpenStateType } from '../../components/drawer/Drawer.types'
import { DrawerSlot } from '../../components/drawer/DrawerSlot'
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
            className={`relative flex flex-col items-center justify-center  xl:w-[500px] md:w-[300px] sm:w-[70%]  h-20 bg-orange-800 p-2 my-2`}
        >
            <DrawerSlot id={id} slotName={'drawer-slot'} opensToThe="center" />
            <DrawerSlot id={id} slotName={'drawer-slot'} opensToThe="bottom" />

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

            <div
                id={`${id}-component`}
                title={`${id}-component`}
                className={`flex flex-row items-center justify-center p-2`}
            >
                <div
                    className={`flex flex-row items-center justify-center mr-2 text-slate-50 font-bold`}
                >
                    {name} | drawer appears from:
                    {toggle}
                </div>

                <DrawerToggle id={id} />
            </div>

            <DrawerSlot id={id} slotName={'drawer-slot'} opensToThe="top" />
        </div>
    )
}
