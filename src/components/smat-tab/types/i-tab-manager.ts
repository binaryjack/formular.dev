import { SmartTabsModeEnum } from '../enum/smart-tabs-mode-enum'
import { ITab } from './i-tab'

export interface ITabManager {
    new (tabs: ITab[]): ITabManager
    tabs: ITab[]
    selectedTabId?: string
    mode: SmartTabsModeEnum
    addTab: (tab: ITab) => void
    removeTab: (id: string) => void
    getTabs: () => ITab[]
    getTabById: (id: string) => ITab | undefined
    selectTab: (id: string) => void
    getSelectedTab: () => ITab | undefined
}
