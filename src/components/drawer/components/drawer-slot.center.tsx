/** @jsxImportSource @emotion/react */

import { useMemo } from 'react'
import { useTriggerOnAddOrRemoveChildren } from '../../../core/hooks/use-trigger-on-add-or-remove-children'
import { ElementPositionOutputType } from '../../../style/global.types'
import { useVisualDebugContext } from '../../context/debug/visual-debug.context'
import { useScrollingContext } from '../../context/scrolling/scrolling.context'
import { PortalSlot } from '../../portals/portals-slot'

interface DrawerSlotProps {
    id: string
    slotName: string

    opensToThe: ElementPositionOutputType
    // Define your props here
}

export const DrawerSlotCenter = ({ id, slotName, opensToThe }: DrawerSlotProps) => {
    const { options } = useVisualDebugContext()
    const { elementRef, trigger } = useTriggerOnAddOrRemoveChildren<HTMLDivElement>()
    /** gets the scrolling screenProperties handled by the Scrolling context */
    const { screenProperties } = useScrollingContext()

    const computeTop = useMemo(() => {
        return screenProperties.scrollY
    }, [screenProperties.screenTop, screenProperties.scrollY])

    return (
        <PortalSlot
            id={id}
            drawerContainerRef={elementRef}
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
                transformOrigin: 'center',
                zIndex: trigger === 'hasChilds' ? 'unset' : '-1'
            }}
        />
    )
}
