import { useCallback, useEffect, useRef, useState } from 'react'

import { useElementRef } from '../useElementRef'
import { IScreenProperties, useScrollingContext } from './Scrolling.context'

export type position = 'A' | 'B'

export const useCenterElementTrigger = () => {
    const [toggle, setToggle] = useState<position>('A')

    const [scrollPosition, setScrollPosition] = useState<IScreenProperties>({} as IScreenProperties)
    const elementRef = useRef<HTMLDivElement>(null)

    const { elementPositionRefs } = useElementRef(elementRef)

    const { screenProperties } = useScrollingContext()

    const handleScroll = useCallback(() => {
        const screentTop = elementPositionRefs.y
        const centerScreen = elementPositionRefs.height / 2
        const triggerPosition = centerScreen + screentTop
        setScrollPosition({
            ...screenProperties,
            centerScreen: centerScreen,
            screenTop: screentTop,
            triggerPoint: centerScreen + screentTop
        })
        setToggle(screenProperties.screenTop > triggerPosition ? 'A' : 'B')
    }, [screenProperties.hasUpdates])

    useEffect(() => {
        handleScroll()
    }, [screenProperties.hasUpdates])

    return {
        elementRef,
        elementPositionRefs,
        scrollPosition,
        toggle
    }
}
