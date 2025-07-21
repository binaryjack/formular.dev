import { SmartTabsContainer } from './smart-tabs-container'
import { ITab } from './types/i-tab'
import { ITabManager } from './types/i-tab-manager'

export interface ISmartTabsMainProps {
    manager: ITabManager
    onSelected: (tab: ITab) => void
}

export const SmartTabsMain = ({ manager, onSelected }: ISmartTabsMainProps) => {
    return (
        <div className={`smart-tabs-main`}>
            <SmartTabsContainer manager={manager} onSelected={onSelected} />
        </div>
    )
}
