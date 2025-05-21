import { ITab } from '@components/smat-tab/types/i-tab'
import { ITabManager } from '@components/smat-tab/types/i-tab-manager'

export const addTab = function (this: ITabManager, tab: ITab) {
    if (this.tabs.find((t) => t.id === tab.id)) {
        throw new Error(`Tab with id ${tab.id} already exists`)
    }
    this.tabs.push(tab)
}
