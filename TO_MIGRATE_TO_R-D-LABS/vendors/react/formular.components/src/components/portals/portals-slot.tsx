/**
 * PortalSlot Component
 *
 * This component is used to create a container for a portal. It generates a `div` element with a unique ID based on the provided `id` and `slotName`.
 *
 * Props:
 * - `id` (string): The unique identifier for the portal slot.
 * - `slotName` (string): The name of the slot where the portal will render its children.
 *
 * Example Usage:
 * ```
 * <PortalSlot id="example" slotName="header" />
 * ```
 */

import { Interpolation, Theme } from '@emotion/react'
import { CSSProperties } from 'react'

// declare an interface props
export interface IPortalSlotProps {
    id: string
    slotName: string
    css?: Interpolation<Theme>
    className?: string
    styles?: CSSProperties
    drawerContainerRef?: React.RefObject<HTMLDivElement>
}

export const PortalSlot = ({
    id,
    slotName,
    drawerContainerRef,
    css,
    className,
    styles
}: IPortalSlotProps) => {
    const targetId = `${id}-${slotName}-container`
    // console.log('PortalSlot render:', { id, slotName, targetId })

    return (
        <div
            ref={drawerContainerRef}
            id={targetId}
            css={css}
            className={className}
            style={styles}
        />
    )
}
