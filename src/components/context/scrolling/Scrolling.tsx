import { useCallback, useEffect, useState } from 'react'

import { VisualLandmark } from '../debug/visual-landmark'
import { IScreenProperties, IScrollingContext, ScrollContextProvider } from './scrolling.context'

interface IScrollContextProps {
    children: React.ReactNode
}

export const ScrollContext = ({ children }: IScrollContextProps) => {
    const [screenProperties, setScreenProperties] = useState<IScreenProperties>(
        {} as IScreenProperties
    )

    const handle = useCallback(
        (eventName: string) => {
            // console.log(eventName)
            setScreenProperties({
                width: window.innerWidth,
                height: window.innerHeight,
                scrollY: window.scrollY,
                screenTop: window.innerHeight / 2,
                centerScreen: window.innerHeight / 2 + window.scrollY,
                triggerPoint: 0,
                hasUpdates:
                    window.innerWidth + window.innerHeight + window.scrollY + window.screenTop
            })
        },
        [window.innerHeight, window.innerWidth, window.scrollY]
    )

    useEffect(() => {
        window.addEventListener('scroll', () => handle('Scroll'), { passive: true })
        window.addEventListener('resize', () => handle('Resize'), { passive: true })
        handle('Init')
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
