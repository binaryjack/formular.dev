import { ITabManager } from '../types/i-tab-manager'
import { SmartTab } from './smart-tab'

export interface ISmartTabsVerticalContainerProps {
    manager: ITabManager
    onSelect: (tabId: string) => void
}

export const SmartTabsVerticalContainer = ({
    manager,
    onSelect
}: ISmartTabsVerticalContainerProps) => {
    return (
        <div className={`smart-tabs-vertical-container`}>
            <div className={`tabs-container`}>
                {manager.getTabs().map((tab) => {
                    return <SmartTab key={tab.id} tab={tab} onSelect={onSelect} />
                })}
            </div>
        </div>
    )
}
