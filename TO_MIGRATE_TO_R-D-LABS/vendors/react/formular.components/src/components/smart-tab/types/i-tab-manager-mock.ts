import { LayoutModeEnum } from '@components/layout/enum/layout-mode-enum'
import { ITab } from './i-tab'
import { ITabManager } from './i-tab-manager'

export const createTabManager = (
    tabs: ITab[],
    mode: LayoutModeEnum = LayoutModeEnum.HORIZONTAL
): ITabManager => {
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
    } as any as ITabManager
}
