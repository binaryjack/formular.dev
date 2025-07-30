import { useCallback, useEffect, useState } from 'react'

import { VisualLandmark } from '../debug/visual-landmark'
import { IScreenProperties, IScrollingContext, ScrollContextProvider } from './scrolling.context'

interface IScrollContextProps {
    children: React.ReactNode
    landMarkHeight?: number
}

export const ScrollContext = ({ children, landMarkHeight = 10 }: IScrollContextProps) => {
    const [screenProperties, setScreenProperties] = useState<IScreenProperties>(
        {} as IScreenProperties
    )
    const handle = useCallback(
        (eventName: string) => {
            setScreenProperties({
                width: window.innerWidth,
                height: window.innerHeight,
                scrollY: window.scrollY,
                screenTop: window.innerHeight / 2,
                centerScreenX: window.innerWidth / 2 - landMarkHeight / 2,
                centerScreenY: window.innerHeight / 2 + window.scrollY - landMarkHeight / 2,
                triggerPoint: 0,
                hasUpdates:
                    window.innerWidth + window.innerHeight + window.scrollY + window.screenTop
            })
        },
        [landMarkHeight]
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
                height={landMarkHeight}
                width={0}
                orientation="horizontal"
                top={screenProperties.centerScreenY}
                displayText={`Y: ${Math.round(screenProperties.centerScreenY)}`}
                color={'bg-red-500'}
            />

            <VisualLandmark
                height={0}
                width={landMarkHeight}
                orientation="vertical"
                left={screenProperties.centerScreenX}
                displayText={`X: ${Math.round(screenProperties.centerScreenX)}`}
                color={'bg-red-500'}
            />
        </ScrollContextProvider.Provider>
    )
}
