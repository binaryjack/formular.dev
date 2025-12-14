import { ITabManager } from '@components/smart-tab/types/i-tab-manager'

export const getSelectedTab = function (this: ITabManager) {
    return this.tabs.find((tab) => tab.id === this.selectedTabId)
}
