import { createContext, useContext } from 'react'
import { ITabManager } from './types/i-tab-manager'

export interface ISmartTabContainerContext {
    manager?: ITabManager
    selectTab: (e: React.MouseEvent, id: string) => void
}

export const defaultSmartTabContainerContext: ISmartTabContainerContext = {
    manager: undefined,
    selectTab: () => {
        return
    }
}

export const SmartTabContainerContext = createContext<ISmartTabContainerContext>(
    defaultSmartTabContainerContext
)

export const useSmartTabCotext = () => {
    return useContext<ISmartTabContainerContext>(SmartTabContainerContext)
}
