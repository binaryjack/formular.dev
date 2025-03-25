/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { ElementPositionOutputType } from '../../core/hooks/screen/screen.types'
import { PortalSlot } from '../portals/PortalSlot'

interface DrawerSlotProps {
    id: string
    slotName: string
    position: ElementPositionOutputType
    // Define your props here
}

const drawerSlotContainerStyle = (position: ElementPositionOutputType) =>
    ['top', 'bottom'].includes(position)
        ? css`
              //   display: flex;
              //   position: relative;
              //   background: red;
              //   width: 100%;
              //   height: 20px;
          `
        : css`
              //   display: grid;
              //   position: relative;
              //   background: red;
              //   width: 100%;
              //   height: 1px;
              //   transform-origin: center;
          `

const DrawerSlot = ({ id, slotName, position }: DrawerSlotProps) => {
    return <PortalSlot id={id} slotName={slotName} />
}

export default DrawerSlot
