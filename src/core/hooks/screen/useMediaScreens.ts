import { useEffect, useState } from 'react'

import useThrottle from '../use-throttle'
import { getMediaBreakpoints, getMediaScreenAspectRatio } from './screen.constructors'
import { IMedia, IMediaBreakpoints, IMediaScreenResult } from './screen.models'

// Hook
const useMediaScreens = (): IMediaScreenResult => {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/

    const [media, setMedia] = useState<IMedia>(
        getMediaScreenAspectRatio(window.innerWidth, window.innerHeight)
    )

    const [breakpoints, setBreakpoints] = useState<IMediaBreakpoints>(
        getMediaBreakpoints(getMediaScreenAspectRatio(window.innerWidth, window.innerHeight))
    )

    // Handler to call on window resize
    const handleResize = useThrottle(() => {
        // Set window width/height to state
        const media = getMediaScreenAspectRatio(window.innerWidth, window.innerHeight)
        const breakpoints = getMediaBreakpoints(media)

        setMedia(media)
        setBreakpoints(breakpoints)
    }, 10)

    useEffect(() => {
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
        windowX: window.innerWidth,
        windowY: window.innerHeight
    } as IMediaScreenResult
}

export default useMediaScreens
