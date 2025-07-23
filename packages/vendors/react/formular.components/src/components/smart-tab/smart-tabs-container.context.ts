import { createContext, useContext } from 'react'
import { ITab } from './types/i-tab'
import { ITabManager } from './types/i-tab-manager'

export interface ISmartTabContainerContext {
    manager?: ITabManager
    selectTab: (e: React.MouseEvent, tab: ITab) => void
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
