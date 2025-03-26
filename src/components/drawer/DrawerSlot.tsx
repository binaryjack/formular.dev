/** @jsxImportSource @emotion/react */

import { ElementPositionOutputType } from '../../core/hooks/screen/screen.types'
import { PortalSlot } from '../portals/PortalSlot'

interface DrawerSlotProps {
    id: string
    slotName: string
    opensToThe: ElementPositionOutputType
    conditionnalShow?: boolean
    // Define your props here
}

export const DrawerSlot = ({
    id,
    slotName,
    opensToThe,
    conditionnalShow = true
}: DrawerSlotProps) =>
    conditionnalShow ? <PortalSlot id={id} slotName={`${slotName}-${opensToThe}`} /> : <></>
