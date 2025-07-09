import { SmartTabsModeEnum } from '../enum/smart-tabs-mode-enum'
import { ITab } from './i-tab'

export interface ITabManagerMock {
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

export const createTabManager = (
    tabs: ITab[],
    mode: SmartTabsModeEnum = SmartTabsModeEnum.HORIZONTAL
): ITabManagerMock => {
    return {
        tabs,
        selectedTabId: tabs.find((tab) => tab.selected)?.id ?? tabs[0]?.id,
        mode,
        addTab: (tab: ITab) => {
            tabs.push(tab)
        },
        removeTab: (id: string) => {
            const index = tabs.findIndex((tab) => tab.id === id)
            if (index !== -1) {
                tabs.splice(index, 1)
            }
        },
        getTabs: () => tabs,
        getTabById: (id: string) => tabs.find((tab) => tab.id === id),
        selectTab: (id: string) => {
            tabs.forEach((tab) => {
                tab.selected = tab.id === id
            })
        },
        getSelectedTab: () => tabs.find((tab) => tab.selected)
    }
}
