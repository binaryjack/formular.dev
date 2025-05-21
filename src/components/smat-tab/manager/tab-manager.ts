import { SmartTabsModeEnum } from '../enum/smart-tabs-mode-enum'
import { ITab } from '../types/i-tab'
import { ITabManager } from '../types/i-tab-manager'
import { addTab } from './prototype/add-tab'
import { getSelectedTab } from './prototype/get-select-tab'
import { getTabById } from './prototype/get-tab-by-id'
import { getTabs } from './prototype/get-tabs'
import { removeTab } from './prototype/remove-tab'
import { selectTab } from './prototype/select-tab'

export const TabManager = function (this: ITabManager, tabs: ITab[]) {
    this.tabs = tabs ? tabs : []
    this.selectedTabId = undefined
    this.mode = SmartTabsModeEnum.HORIZONTAL
} as any as ITabManager

Object.assign(TabManager.prototype, {
    addTab,
    removeTab,
    getTabs,
    getTabById,
    selectTab,
    getSelectedTab
})
