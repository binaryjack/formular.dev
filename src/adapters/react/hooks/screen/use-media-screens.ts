import { useEffect, useState } from 'react'

import useThrottle from '../use-throttle'
import { getMediaBreakpoints, getMediaScreenAspectRatio } from './screen.constructors'
import { IMedia, IMediaBreakpoints, IMediaScreenResult } from './screen.models'

// Hook
const useMediaScreens = (): IMediaScreenResult => {
    // SSR-safe initial state
    const getInitialMedia = () =>
        typeof window !== 'undefined'
            ? getMediaScreenAspectRatio(window.innerWidth, window.innerHeight)
            : getMediaScreenAspectRatio(0, 0)

    const [media, setMedia] = useState<IMedia>(getInitialMedia)
    const [breakpoints, setBreakpoints] = useState<IMediaBreakpoints>(
        getMediaBreakpoints(getInitialMedia())
    )
    const [windowSize, setWindowSize] = useState<{ x: number; y: number }>(() =>
        typeof window !== 'undefined'
            ? { x: window.innerWidth, y: window.innerHeight }
            : { x: 0, y: 0 }
    )

    // Handler to call on window resize
    const handleResize = useThrottle(() => {
        if (typeof window === 'undefined') return
        const width = window.innerWidth
        const height = window.innerHeight
        const media = getMediaScreenAspectRatio(width, height)
        const breakpoints = getMediaBreakpoints(media)
        setMedia(media)
        setBreakpoints(breakpoints)
        setWindowSize({ x: width, y: height })
    }, 150) // Use a more reasonable throttle delay

    useEffect(() => {
        if (typeof window === 'undefined') return
        // Add event listener
        window.addEventListener('resize', handleResize)
        // Call handler right away so state gets updated with initial window size
        handleResize()
        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize)
    }, []) // Empty array ensures that effect is only run on mount

    return {
        breakpoints,
        media,
        windowX: windowSize.x,
        windowY: windowSize.y
    }
}

export default useMediaScreens
