import { createContext, useContext } from 'react'

import { IMedia, IMediaBreakpoints } from '../../../core/hooks/screen/screen.models'
import { IDebug } from '../debug/debug.types'

export interface IAppContext {
    breakpoints?: IMediaBreakpoints
    media?: IMedia
    isMobileDevice: boolean
    debug?: IDebug
    holdScroll: boolean
    setHoldScroll: (hold: boolean) => void
}

export const appContextDefault = {
    breakpoints: undefined,
    media: undefined,
    currentY: 0,
    middleScreenY: 0,
    middleScreenRefPositionY: 0,
    isMobileDevice: false,
    debug: undefined,
    holdScroll: false,
    setHoldScroll: () => {
        return
    }
}

export const AppContext = createContext<IAppContext>(appContextDefault)

const useAppContext = (): IAppContext => {
    return useContext(AppContext)
}

export default useAppContext
