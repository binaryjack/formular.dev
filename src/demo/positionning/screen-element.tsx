import { CenterElementDebug } from '../../components/context/debug/center-element-debug'
import { Drawer } from '../../components/drawer/drawer'

import { DrawerSlot } from '../../components/drawer/components/drawer-slot'
import { DrawerContent } from '../../components/drawer/components/drawer.content'
import { DrawerToggle } from '../../components/drawer/components/drawer.toggle'
import { Toggleable } from '../../components/toggleable/toggleable'
import { useCenterElementTrigger } from '../../core/hooks/screen/useCenterElement'

interface ScreenElementProps {
    id: string
    name: string
}

export const ScreenElement = ({ id, name }: ScreenElementProps) => {
    const { scrollPosition, elementRef, elementPositionRefs, toggle } =
        useCenterElementTrigger<HTMLDivElement>()

    return (
        <Toggleable>
            <div
                ref={elementRef}
                className={`relative flex flex-col items-center justify-center 
                2xs:bg-orange-500 2xs:w-full
                xs:bg-red-500 sx:w-full
                sm:bg-blue-500 sm:w-2/3
                md:bg-green-500 md:w-1/2
                lg:bg-yellow-500 lg:w-96                
                xl:bg-pink-500 xl:w-96 
                2xl:bg-violet-500 2xl:w-80 
                
                h-20 p-2 my-2`}
            >
                <DrawerSlot id={id} slotName={'drawer-slot'} opensToThe="center" />
                <DrawerSlot id={id} slotName={'drawer-slot'} opensToThe="bottom" />

                <Drawer id={id} position={toggle} width="200px" height="200px">
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
                    className={`flex flex-row items-center justify-center w-full p-2 overflow-hidden`}
                >
                    <div
                        className={`w-full flex flex-row items-center justify-between mr-2 text-slate-50 font-bold`}
                    >
                        {name} | drawer appears from:
                        <div
                            className={`${
                                toggle === 'top'
                                    ? 'bg-yellow-700 text-yellow-50 border border-yellow-700'
                                    : toggle === 'bottom'
                                      ? 'bg-purple-700 text-purple-50 border border-purple-700'
                                      : 'bg-lime-700-700 text-lime-50 border border-lime-700'
                            }`}
                        >
                            {toggle}
                        </div>
                    </div>

                    <DrawerToggle id={id} />
                </div>

                <DrawerSlot id={id} slotName={'drawer-slot'} opensToThe="top" />
            </div>
        </Toggleable>
    )
}
