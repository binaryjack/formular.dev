import { ITabManager } from '@components/smat-tab/types/i-tab-manager'

export const removeTab = function (this: ITabManager, id: string) {
    const tab = this.getTabById(id)
    if (tab) {
        this.tabs = this.tabs.filter((t: any) => t.id !== id)
        if (this.selectedTabId === id) {
            this.selectedTabId = this.tabs.length > 0 ? this.tabs[0].id : undefined
        }
    }
}
