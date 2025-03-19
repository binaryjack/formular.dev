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

// declare an interface props
export interface IPortalSlotProps {
    id: string
    slotName: string
}

export const PortalSlot = ({ id, slotName }: IPortalSlotProps) => (
    <div id={`${id}-${slotName}-container`} />
)
