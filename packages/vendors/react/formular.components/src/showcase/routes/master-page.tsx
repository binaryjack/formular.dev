import { useTabs } from '@adapters/react/fields/hooks/use-tabs'
import { LayoutModeEnum } from '@components/layout/enum/layout-mode-enum'
import { MasterDetailLayout } from '@components/layout/master-detail/master-detail-layout'
import { SmartTabsMain } from '@components/smart-tab/smart-tabs-main'
import { ITab } from '@components/smart-tab/types/i-tab'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { createTabBuilders } from './master-page.route-builders'

const tabBuilders = createTabBuilders()
const tabs = tabBuilders.map((builder) => builder.build())

export const MasterPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { hashPrint, tabManager } = useTabs(tabs)

    const handleTabSelected = (e: React.MouseEvent, tab: ITab) => {
        navigate(tab?.path || '/')
    }

    return (
        <MasterDetailLayout
            menu={<SmartTabsMain manager={tabManager} onSelected={handleTabSelected} />}
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
