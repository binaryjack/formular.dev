import { useEffect, useState } from 'react'

import useThrottle from '../../../core/hooks/useThrottle'
import { ElementPositionOutputType } from '../../../style/global.types'
import useAppContext from '../../context/appContext/AppContext.context'
import { useScrollingContext } from '../../context/scrolling/Scrolling.context'
import { DrawerOpenStateType } from '../Drawer.types'

export type OverflowingEdgeType = 'top' | 'bottom' | 'none'

export const useDrawerIsOverflowing = <T extends HTMLElement>(
    element: T,
    position: ElementPositionOutputType,
    drawerOpenState?: DrawerOpenStateType,
    height?: string
) => {
    /** gets the responsive media object handled through the application context */
    const { media } = useAppContext()
    /** gets the scrolling screenProperties handled by the Scrolling context */
    const { screenProperties } = useScrollingContext()

    const [isOverflowingAt, setIsOverflowingAt] = useState<OverflowingEdgeType>('none')

    const checkOverflow = useThrottle(() => {
        const objectBoundingCliRect = element?.getBoundingClientRect?.()

        const drawerTop = objectBoundingCliRect.top
        const drawerBottom = Number(height?.replaceAll(/\D*/gi, '')) + objectBoundingCliRect.top
        console.log(position, drawerTop, drawerBottom)
        if (drawerTop < 0) {
            setIsOverflowingAt('top')
        } else if (drawerBottom >= window.innerHeight) {
            setIsOverflowingAt('bottom')
        } else {
            setIsOverflowingAt('none')
        }
    }, 150)

    useEffect(() => {
        if (drawerOpenState === 'closed') return
        if (!element) return
        checkOverflow()
    }, [element, position, drawerOpenState, screenProperties.hasUpdates, media?.media])

    return {
        isOverflowingAt
    }
}
