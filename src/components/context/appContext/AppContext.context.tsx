import { createContext, useContext } from 'react'

export interface IAppContext {
    currentY: number
}

export const appContextDefault = {
    currentY: 0
}

export const AppContext = createContext<IAppContext>(appContextDefault)

const useAppContext = (): IAppContext => {
    return useContext(AppContext)
}

export default useAppContext
