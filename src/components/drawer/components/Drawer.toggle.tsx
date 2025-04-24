/** @jsxImportSource @emotion/react */

import { PortalSlot } from '../../portals/portals-slot'

interface DrawerToggleProps {
    id: string
    conditionnalShow?: boolean
    // Define your props here
}

export const DrawerToggle = ({ id, conditionnalShow = true }: DrawerToggleProps) =>
    conditionnalShow ? <PortalSlot id={id} slotName={`toggle-drawer`} /> : <></>
