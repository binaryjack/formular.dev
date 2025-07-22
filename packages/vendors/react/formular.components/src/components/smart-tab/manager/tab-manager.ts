import { LayoutModeEnum } from '@components/layout/enum/layout-mode-enum'
import { ITab } from '../types/i-tab'
import { ITabManager } from '../types/i-tab-manager'
import { addTab } from './prototype/add-tab'
import { getHash } from './prototype/get-hash'
import { getSelectedTab } from './prototype/get-select-tab'
import { getTabById } from './prototype/get-tab-by-id'
import { getTabs } from './prototype/get-tabs'
import { removeTab } from './prototype/remove-tab'
import { selectTab } from './prototype/select-tab'

export const TabManager = function (this: ITabManager, tabs?: ITab[]) {
    this.tabs = tabs ?? []
    this.selectedTabId = undefined
    this.mode = LayoutModeEnum.HORIZONTAL
    this.getHash()
} as any as ITabManager

Object.assign(TabManager.prototype, {
    addTab,
    removeTab,
    getTabs,
    getTabById,
    selectTab,
    getSelectedTab,
    getHash
})
