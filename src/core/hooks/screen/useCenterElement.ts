import { useCallback, useEffect, useRef, useState } from 'react'

import useAppContext from '../../../components/context/appContext/AppContext.context'
import {
    IScreenProperties,
    useScrollingContext
} from '../../../components/context/scrolling/Scrolling.context'
import { ElementPositionOutputType } from '../../../style/global.types'
import { useElementRef } from '../useElementRef'

export const useCenterElementTrigger = <T extends HTMLElement>() => {
    /** gets the responsive media object handled through the application context */
    const { media } = useAppContext()
    /** gets the scrolling screenProperties handled by the Scrolling context */
    const { screenProperties } = useScrollingContext()

    const [toggle, setToggle] = useState<ElementPositionOutputType>('center')
    const [scrollPosition, setScrollPosition] = useState<IScreenProperties>({} as IScreenProperties)
    /** use this output to ref the div which will be used as a horizontal reference keept at the middle of the screen */
    const elementRef = useRef<T>(null)
    /** this hook will extract all needed bounding rectangle box data as a IElementRef*/
    const { elementPositionRefs } = useElementRef<T>(elementRef)

    const handleScroll = useCallback(() => {
        if (!media?.media) return

        const screentTop = elementPositionRefs.y
        const centerScreen = elementPositionRefs.height / 2
        const triggerPosition = centerScreen + screentTop

        const isLaptopAndHigher = ['MD', 'LG', 'XL', '2XL'].includes(media?.media)

        const isPositionTop = isLaptopAndHigher && screenProperties.screenTop > triggerPosition

        const isPositionBottom = isLaptopAndHigher && screenProperties.screenTop <= triggerPosition

        const targetPositionToggle: ElementPositionOutputType = isPositionTop
            ? 'top'
            : isPositionBottom
              ? 'bottom'
              : 'center'

        setScrollPosition({
            ...screenProperties,
            centerScreen: centerScreen,
            screenTop: screentTop,
            triggerPoint: centerScreen + screentTop
        })

        setToggle(targetPositionToggle)
    }, [screenProperties.hasUpdates, media?.media])

    useEffect(() => {
        handleScroll()
    }, [screenProperties.hasUpdates, media?.media])

    return {
        elementRef,
        elementPositionRefs,
        scrollPosition,
        toggle
    }
}
