import { createContext, useContext } from 'react'
import { IDebug } from './debug.types'

export interface IVisualDebugContext {
    options?: IDebug
}

export const visualDebugContextDefault: IVisualDebugContext = {
    options: undefined
}

export const DebugContextProvider = createContext<IVisualDebugContext>(visualDebugContextDefault)

export const useVisualDebugContext = () => {
    const context = useContext(DebugContextProvider)
    if (context === undefined) {
        throw new Error('useDebugContext must be used within a VisualDebug')
    }
    return context
}
