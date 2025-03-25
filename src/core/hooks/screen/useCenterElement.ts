import { useCallback, useEffect, useRef, useState } from 'react'

import useAppContext from '../../../components/context/appContext/AppContext.context'
import {
    IScreenProperties,
    useScrollingContext
} from '../../../components/context/scrolling/Scrolling.context'
import { useElementRef } from '../useElementRef'
import { ElementPositionOutputType } from './screen.types'

export const useCenterElementTrigger = <T extends HTMLElement>() => {
    const [toggle, setToggle] = useState<ElementPositionOutputType>('center')

    const [scrollPosition, setScrollPosition] = useState<IScreenProperties>({} as IScreenProperties)
    const elementRef = useRef<T>(null)

    const { elementPositionRefs } = useElementRef<T>(elementRef)
    const { media } = useAppContext()
    const { screenProperties } = useScrollingContext()

    const handleScroll = useCallback(() => {
        if (!media?.media) return

        const screentTop = elementPositionRefs.y
        const centerScreen = elementPositionRefs.height / 2
        const triggerPosition = centerScreen + screentTop

        const isLaptopAndHigher = ['M', 'L', 'XL', 'XXL'].includes(media?.media)

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
