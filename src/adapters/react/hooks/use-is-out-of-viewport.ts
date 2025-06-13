import { useEffect, useState } from 'react'

import useThrottle from './use-throttle'

const useIsOutOfViewport = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    element: React.MutableRefObject<any | undefined>,
    throttleDelay: number
) => {
    const [isBottomOut, setIsBottomOut] = useState(false)
    const [isTopOut, setIsTopOut] = useState(false)

    const onScroll = useThrottle(() => {
        if (!element.current) return
        const top = element.current.getBoundingClientRect().top
        const bottom = element.current.getBoundingClientRect().bottom

        const topInnerHeight = 0
        const bottomInnerHeight = window.visualViewport?.height ?? window.innerHeight

        setIsTopOut(top < topInnerHeight)
        setIsBottomOut(bottom > bottomInnerHeight)
    }, throttleDelay)

    useEffect(() => {
        // Call onScroll once on mount to set initial state
        onScroll()
        document.addEventListener('scroll', onScroll, true)
        document.addEventListener('animationend', onScroll, false)
        return () => {
            document.removeEventListener('scroll', onScroll, true)
            document.removeEventListener('animationend', onScroll, true)
        }
    }, [onScroll])

    return { isTopOut, isBottomOut }
}

export default useIsOutOfViewport
