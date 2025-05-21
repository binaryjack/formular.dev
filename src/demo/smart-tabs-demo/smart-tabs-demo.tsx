import { MasterDetailLayout } from '@components/layout/master-detail/master-detail-layout'
import { newTab } from '@components/smat-tab/helpers/new-tab'
import { TabManager } from '@components/smat-tab/manager/tab-manager'
import { SmartTabsMain } from '@components/smat-tab/smart-tabs-main'
import { TbIcons } from 'react-icons/tb'

const tabs = [
    newTab('tab1', 'Tab 1', <TbIcons />),
    newTab('tab2', 'Tab 2', <TbIcons />),
    newTab('tab3', 'Tab 3', <TbIcons />),
    newTab('tab4', 'Tab 4', <TbIcons />),
    newTab('tab5', 'Tab 5', <TbIcons />),
    newTab('tab6', 'Tab 6', <TbIcons />),
    newTab('tab7', 'Tab 7', <TbIcons />),
    newTab('tab8', 'Tab 8', <TbIcons />)
]

const tabManager = new TabManager(tabs)

export const SmartTabsDemo = () => {
    return (
        <MasterDetailLayout
            menu={<SmartTabsMain manager={tabManager} onSelected={() => {}} />}
            body={<div>DETAIL</div>}
        />
    )
}
