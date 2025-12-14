import { ITabManager } from '@components/smart-tab/types/i-tab-manager'

export const getTabs = function (this: ITabManager) {
    return this.tabs
}
