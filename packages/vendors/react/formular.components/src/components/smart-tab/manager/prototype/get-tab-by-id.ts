import { ITab } from '@components/smart-tab/types/i-tab'

export const getTabById = function (this: any, id: string) {
    const tab = this.tabs.find((tab: ITab) => tab.id === id)
    if (tab && !tab.disabled) {
        this.selectedTabId = id
        this.tabs.forEach((t: any) => {
            t.selected = t.id === id
        })
    }
    return tab
}
