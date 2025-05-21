import { ITabManager } from '@components/smat-tab/types/i-tab-manager'

export const selectTab = function (this: ITabManager, id: string) {
    const tab = this.getTabById(id)
    if (tab && !tab.disabled) {
        this.selectedTabId = id
        this.tabs.forEach((t: any) => {
            t.selected = t.id === id
        })
    }
}
