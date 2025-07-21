import { LayoutModeEnum } from '@components/layout/enum/layout-mode-enum'
import { INotificationManager } from 'formular.dev.lib/types/formular-dev.es'
import { ITab } from './i-tab'

export interface ITabManager {
    new (tabs?: ITab[]): ITabManager
    notificationManager: INotificationManager
    tabs: ITab[]
    selectedTabId?: string
    mode: LayoutModeEnum
    addTab: (tab: ITab) => void
    removeTab: (id: string) => void
    getTabs: () => ITab[]
    getTabById: (id: string) => ITab | undefined
    selectTab: (id: string) => void
    getSelectedTab: () => ITab | undefined
}
