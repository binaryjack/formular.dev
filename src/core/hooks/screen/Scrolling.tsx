import { useCallback, useEffect, useState } from 'react'
import useThrottle from '../useThrottle'
import { IScreenProperties, IScrollingContext, ScrollContextProvider } from './Scrolling.context'
import { VisualLandmark } from './VisualLandmark'

interface IScrollContextProps {
    children: React.ReactNode
}

export const ScrollContext = ({ children }: IScrollContextProps) => {
    const [screenProperties, setScreenProperties] = useState<IScreenProperties>(
        {} as IScreenProperties
    )

    const updates = useCallback(() => {
        return window.innerWidth + window.innerHeight + window.scrollY + window.screenTop
    }, [window.innerWidth, window.innerHeight, window.scrollY, window.screenTop])

    const handle = useCallback(
        useThrottle((eventName: string) => {
            console.log(eventName)
            setScreenProperties({
                width: window.innerWidth,
                height: window.innerHeight,
                scrollY: window.scrollY,
                screenTop: window.innerHeight / 2,
                centerScreen: window.innerHeight / 2 + window.scrollY,
                triggerPoint: 0,
                hasUpdates: updates()
            })
        }, 10),
        [window.innerHeight, window.innerWidth, window.scrollY]
    )

    useEffect(() => {
        window.addEventListener('scroll', () => handle('Scroll'), { passive: true })
        window.addEventListener('resize', () => handle('Resize'), { passive: true })
        return () => {
            window.removeEventListener('scroll', () => handle('Scroll'))
            window.removeEventListener('resize', () => handle('Resize'))
        }
    }, [])

    const scrollingContextValue: IScrollingContext = {
        screenProperties: screenProperties
    }

    return (
        <ScrollContextProvider.Provider value={scrollingContextValue}>
            {children}
            <VisualLandmark
                height={25}
                width={0}
                top={screenProperties.centerScreen}
                displayText={`${screenProperties.screenTop}`}
                color={'bg-red-500'}
            />
        </ScrollContextProvider.Provider>
    )
}
