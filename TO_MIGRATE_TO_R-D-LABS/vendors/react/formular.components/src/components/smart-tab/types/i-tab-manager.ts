import { LayoutModeEnum } from '@components/layout/enum/layout-mode-enum'

import { ITab } from './i-tab'

import type { INotificationManager } from 'formular.dev.lib'
export interface ITabManager {
    new (tabs?: ITab[]): ITabManager
    notificationManager: INotificationManager
    tabs: ITab[]
    selectedTabId?: string
    mode: LayoutModeEnum
    getHash: () => number
    addTab: (tab: ITab) => void
    removeTab: (id: string) => void
    getTabs: () => ITab[]
    getTabById: (id: string) => ITab | undefined
    selectTab: (id: string) => void
    getSelectedTab: () => ITab | undefined
}
