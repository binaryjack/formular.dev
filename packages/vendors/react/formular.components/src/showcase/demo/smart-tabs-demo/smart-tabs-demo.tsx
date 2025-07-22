import { useTabs } from '@adapters/react/fields/hooks/use-tabs'
import { LayoutModeEnum } from '@components/layout/enum/layout-mode-enum'
import { MasterDetailLayout } from '@components/layout/master-detail/master-detail-layout'
import { newTab } from '@components/smart-tab/helpers/new-tab'
import { SmartTabsMain } from '@components/smart-tab/smart-tabs-main'
import {
    TbAbacus,
    TbAd2,
    TbAlarm,
    TbAlpha,
    TbClipboard,
    TbCloudDown,
    TbCloudUp,
    TbFiles,
    TbHome,
    TbNavigation
} from 'react-icons/tb'
import { Outlet } from 'react-router-dom'

const tabs = [
    newTab('tab1', 'Tab 1', <TbHome />, undefined, false, undefined, []),
    newTab('tab2', 'Tab 2', <TbClipboard />, undefined, false, undefined, []),
    newTab('tab3', 'Tab 3', <TbFiles />, undefined, false, undefined, []),
    newTab('tab4', 'Tab 4', <TbAd2 />, undefined, false, undefined, [
        newTab('tab4-1', 'Tab 4-1', <TbAbacus />, undefined, false, undefined, [
            newTab('tab4-1-1', 'Tab 4-1-1', <TbAbacus />, undefined, false, undefined, [])
        ])
    ]),
    newTab('tab5', 'Tab 5', <TbAlarm />, undefined, false, undefined, []),
    newTab('tab6', 'Tab 6', <TbAlpha />, undefined, false, undefined, []),
    newTab('tab7', 'Tab 7', <TbNavigation />, undefined, false, undefined, []),
    newTab('tab8', 'Tab 8', <TbCloudDown />, undefined, false, undefined, [
        newTab('tab8-1', 'Tab 8-1', <TbCloudUp />)
    ])
]

export const SmartTabsDemo = () => {
    const { hashPrint, tabManager } = useTabs(tabs)
    return (
        <MasterDetailLayout
            menu={<SmartTabsMain manager={tabManager} onSelected={() => {}} />}
            body={
                <main className="w-full h-full p-4 bg-green-100">
                    <Outlet />
                </main>
            }
            mobileMode={LayoutModeEnum.VERTICAL}
            desktopMode={LayoutModeEnum.VERTICAL}
        />
    )
}
