import { ITab } from '@components/smart-tab/types/i-tab'
import { ITabManager } from '@components/smart-tab/types/i-tab-manager'

const selectTabRecursive = (tabs: ITab[], selectId: string) => {
    for (const tab of tabs) {
        tab.selected = !tab.disabled && tab.id === selectId
        if (tab.childrens) {
            selectTabRecursive(tab.childrens, selectId)
        }
    }
}

export const selectTab = function (this: ITabManager, id: string) {
    selectTabRecursive(this.tabs, id)
    this.getHash()
}
