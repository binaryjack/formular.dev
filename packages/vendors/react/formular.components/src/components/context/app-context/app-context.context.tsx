import { IMedia, IMediaBreakpoints } from '@adapters/react/hooks/screen/screen.models'
import { LayoutModeEnum } from '@components/layout/enum/layout-mode-enum'
import { IServiceManager, ServiceIdType } from 'formular.dev.lib'
import { createContext, useContext } from 'react'
import { IDebug } from '../debug/debug.types'

export interface ILayoutModes {
    mobile: LayoutModeEnum
    desktop: LayoutModeEnum
}

export interface IAppContext {
    // Existing app context properties
    breakpoints?: IMediaBreakpoints
    media?: IMedia
    isMobileDevice: () => boolean
    debug?: IDebug
    holdScroll: boolean
    setHoldScroll: (hold: boolean) => void
    layoutMode: ILayoutModes
    // Service manager functionality
    serviceManager: IServiceManager
    getService: <T>(identifier: ServiceIdType<T>) => T | undefined
    getServiceSync: <T>(identifier: ServiceIdType<T>) => T
    getConfiguration: <T>(...path: string[]) => T | undefined
}

export const appContextDefault: Partial<IAppContext> = {
    breakpoints: undefined,
    media: undefined,
    isMobileDevice: () => {
        return false
    },
    debug: undefined,
    holdScroll: false,
    setHoldScroll: () => {
        return
    },
    getConfiguration: function <T>(...path: string[]) {
        return {} as T
    }
}

export const AppContext = createContext<IAppContext | null>(null)

const useAppContext = (): IAppContext => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useAppContext must be used within an AppContextProvider')
    }
    return context
}

export default useAppContext
