import { ITab } from '@components/smart-tab/types/i-tab'

function* getTabRecursive(tabs: ITab[], selectId: string): any {
    for (const tab of tabs) {
        if (tab.id === selectId) {
            yield tab
        }
        if (tab.childrens) {
            yield getTabRecursive(tab.childrens, selectId)
        }
    }
    yield undefined
}

export const getTabById = async function (this: any, id: string) {
    const tab = await getTabRecursive(this.tabs, id)
    return tab
}
