import { ITab } from '@components/smart-tab/types/i-tab'
import { ITabManager } from '@components/smart-tab/types/i-tab-manager'
import { fnv1aHash } from 'formular.dev.lib'

const getStringPrintRecursive = (tabs: ITab[]): string => {
    let output = ``
    for (const t of tabs) {
        output = `${output}|${t.label}.${t.selected ? '[S]' : '[X]'}`
        if (t.childrens && t.childrens?.length > 0) {
            output = `${output}${getStringPrintRecursive(t.childrens)}`
        }
    }
    return output
}

export const getHash = function (this: ITabManager) {
    const tabsMap = getStringPrintRecursive(this.tabs)
    this.notificationManager?.notify?.('onUiUpdate')
    return fnv1aHash(tabsMap)
}
