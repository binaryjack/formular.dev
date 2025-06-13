import { useCallback, useEffect, useRef, useState } from 'react'

import useAppContext from '@components/context/app-context/app-context.context'
import { useScrollingContext } from '@components/context/scrolling/scrolling.context'

import { DrawerBreakPointType, ElementPositionOutputType } from '@style/global.types'
import { useElementRef } from '../use-element-ref'

export const useCenterElementTrigger = <T extends HTMLElement>() => {
    /** gets the responsive media object handled through the application context */
    const { media } = useAppContext()
    /** gets the scrolling screenProperties handled by the Scrolling context */
    const { screenProperties } = useScrollingContext()

    const [toggle, setToggle] = useState<ElementPositionOutputType>('center')
    const [scrollPosition, setScrollPosition] = useState<any>({})
    /** use this output to ref the div which will be used as a horizontal reference kept at the middle of the screen */
    const elementRef = useRef<T>(null)
    /** this hook will extract all needed bounding rectangle box data as a IElementRef*/
    const { elementPositionRefs } = useElementRef<T>(elementRef)

    const handleScroll = useCallback(() => {
        if (!media?.media) return

        // Guard for undefined values
        const screenTop = elementPositionRefs.y ?? 0
        const elementHalfHeight = elementPositionRefs.height ? elementPositionRefs.height / 2 : 0
        const triggerPosition = elementHalfHeight + screenTop

        // Ensure DrawerBreakPointType is an array
        const isLaptopAndHigher =
            Array.isArray(DrawerBreakPointType) && DrawerBreakPointType.includes(media.media)

        const isPositionTop = isLaptopAndHigher && screenProperties.screenTop > triggerPosition
        const isPositionBottom = isLaptopAndHigher && screenProperties.screenTop <= triggerPosition

        const targetPositionToggle: ElementPositionOutputType = isPositionTop
            ? 'top'
            : isPositionBottom
              ? 'bottom'
              : 'center'

        setScrollPosition({
            ...screenProperties,
            centerScreen: elementHalfHeight,
            screenTop,
            triggerPoint: triggerPosition
        })

        setToggle(targetPositionToggle)
    }, [screenProperties, media?.media, elementPositionRefs])

    useEffect(() => {
        handleScroll()
    }, [handleScroll])

    /**
     * useCenterElementTrigger
     *
     * Hook to track and toggle the position state ('top', 'center', 'bottom') of a referenced element
     * relative to the screen's scroll position and responsive breakpoints.
     *
     * @returns {object} { elementRef, elementPositionRefs, toggle }
     */
    return {
        elementRef,
        elementPositionRefs,
        scrollPosition,
        toggle
    }
}
