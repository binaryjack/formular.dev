/** @jsxImportSource @emotion/react */

import { useMemo } from 'react'
import { ElementPositionOutputType } from '../../../style/global.types'
import useAppContext from '../../context/appContext/AppContext.context'
import { useVisualDebugContext } from '../../context/debug/VisualDebug.context'
import { useScrollingContext } from '../../context/scrolling/Scrolling.context'
import { PortalSlot } from '../../portals/PortalSlot'

interface DrawerSlotProps {
    id: string
    slotName: string
    opensToThe: ElementPositionOutputType
    conditionalShow?: boolean
    // Define your props here
}

export const DrawerSlotCenter = ({
    id,
    slotName,
    opensToThe,
    conditionalShow = true
}: DrawerSlotProps) => {
    const { options } = useVisualDebugContext()
    /** gets the responsive media object handled through the application context */
    const { media } = useAppContext()
    /** gets the scrolling screenProperties handled by the Scrolling context */
    const { screenProperties } = useScrollingContext()

    const computeTop = useMemo(() => {
        return screenProperties.scrollY
    }, [screenProperties.screenTop, screenProperties.scrollY])

    return (
        <PortalSlot
            id={id}
            slotName={`${slotName}-${opensToThe}`}
            className={`relative w-full`}
            styles={{
                position: 'absolute',
                display: 'flex',
                background: options?.enabled ? `red` : 'unset',
                height: options?.enabled ? `1px` : '100vh',
                top: `${computeTop}px`,
                width: '100vw',
                alignItems: `center`,
                justifyItems: `center`,
                justifyContent: `center`,
                transformOrigin: 'center'
            }}
        />
    )
}
