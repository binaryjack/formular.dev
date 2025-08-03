import { IDrawerSize } from '../types/drawer.types'

export const calculateSmartPosition = (
    size: IDrawerSize,
    ownerRect: DOMRect,
    screenWidth: number,
    screenHeight: number
) => {
    const spaceRight = screenWidth - ownerRect.right
    const spaceLeft = ownerRect.left
    const spaceBottom = screenHeight - ownerRect.bottom
    const spaceTop = ownerRect.top

    // Check if drawer fits in each direction
    const fitsRight = spaceRight >= size.width
    const fitsLeft = spaceLeft >= size.width
    const fitsBottom = spaceBottom >= size.height
    const fitsTop = spaceTop >= size.height

    // Priority: right > left > bottom > top
    if (fitsRight && fitsBottom) return 'bottom-right'
    if (fitsRight && fitsTop) return 'top-right'
    if (fitsLeft && fitsBottom) return 'bottom-left'
    if (fitsLeft && fitsTop) return 'top-left'
    if (fitsRight) return 'right'
    if (fitsLeft) return 'left'
    if (fitsBottom) return 'bottom'
    if (fitsTop) return 'top'

    // Fallback to center if nothing fits well
    return 'center'
}
