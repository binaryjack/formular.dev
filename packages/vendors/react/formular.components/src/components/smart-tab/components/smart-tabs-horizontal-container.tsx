import { ITabManager } from '../types/i-tab-manager'
import { SmartTab } from './smart-tab'
export interface ISmartTabsHorizontalContainerProps {
    manager: ITabManager
    onSelect: (tabId: string) => void
}

export const SmartTabsHorizontalContainer = ({
    manager,
    onSelect
}: ISmartTabsHorizontalContainerProps) => {
    return (
        <div className={`smart-tabs-horizontal-container`}>
            <div className={`tabs-container`}>
                {manager.getTabs().map((tab) => {
                    return <SmartTab key={tab.id} tab={tab} onSelect={onSelect} />
                })}
            </div>
        </div>
    )
}
