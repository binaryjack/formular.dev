import { createContext, useContext } from 'react'

import { IMedia, IMediaBreakpoints } from '../../../core/hooks/screen/screen.models'

export interface IAppContext {
    breakpoints?: IMediaBreakpoints
    media?: IMedia
    currentY: number
    middleScreenY: number
    middleScreenRefPositionY: number
    isMobileDevice: boolean
}

export const appContextDefault = {
    breakpoints: undefined,
    media: undefined,
    currentY: 0,
    middleScreenY: 0,
    middleScreenRefPositionY: 0,
    isMobileDevice: false
}

export const AppContext = createContext<IAppContext>(appContextDefault)

const useAppContext = (): IAppContext => {
    return useContext(AppContext)
}

export default useAppContext
