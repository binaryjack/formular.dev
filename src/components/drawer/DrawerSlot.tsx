/** @jsxImportSource @emotion/react */

import { ElementPositionOutputType } from '../../core/hooks/screen/screen.types'
import { useVisualDebugContext } from '../context/debug/VisualDebug.context'
import { PortalSlot } from '../portals/PortalSlot'

interface DrawerSlotProps {
    id: string
    slotName: string
    opensToThe: ElementPositionOutputType
    conditionalShow?: boolean
    // Define your props here
}

export const DrawerSlot = ({
    id,
    slotName,
    opensToThe,
    conditionalShow = true
}: DrawerSlotProps) => {
    const { options } = useVisualDebugContext()

    if (!conditionalShow) return <></>

    return (
        <PortalSlot
            id={id}
            slotName={`${slotName}-${opensToThe}`}
            className={`relative w-full`}
            styles={{
                display: opensToThe === 'center' ? 'grid' : 'flex',
                background: options?.enabled ? `red` : 'unset',
                height: options?.enabled ? `1px` : 'unset',
                alignItems: opensToThe === 'center' ? `center` : 'unset',
                justifyItems: opensToThe === 'center' ? `center` : 'unset',
                transformOrigin: opensToThe === 'center' ? 'center' : 'unset'
            }}
        />
    )
}
