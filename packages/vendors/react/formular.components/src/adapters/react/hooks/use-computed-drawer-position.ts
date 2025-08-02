import { calculateSmartPosition } from '@components/__v2/drawer/computed/calculate-smart-position'
import { IDrawerSize } from '@components/__v2/drawer/drawer.types'
import { useScrollingContext } from '@components/context/scrolling/scrolling.context'
import { ElementPositionType } from 'formular.design.system'
import { useEffect, useRef, useState } from 'react'

export const useComputedDrawerPosition = (position: ElementPositionType, size: IDrawerSize) => {
    const { screenProperties } = useScrollingContext()
    const drawerHolderRef = useRef<HTMLDivElement>(null)
    const [calculatedPosition, setCalculatedPosition] = useState<ElementPositionType>(position)

    useEffect(() => {
        const element = drawerHolderRef?.current as unknown as HTMLElement

        if (!element || !screenProperties) return

        const rect = element.getBoundingClientRect()

        // Calculate smart position only if position is 'center' or not specified
        if (position === 'center' || !position) {
            const smartPosition = calculateSmartPosition(
                size,
                rect,
                screenProperties.width,
                screenProperties.height
            )
            setCalculatedPosition(smartPosition)
        } else {
            setCalculatedPosition(position)
        }
    }, [screenProperties, position, size])

    return { calculatedPosition, drawerHolderRef }
}
