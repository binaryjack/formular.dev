import { cx } from 'formular.design.system'
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
        <div className={cx('flex flex-col border-r border-secondary-200 w-56')}>
            <div className={cx('flex flex-col')}>
                {manager.getTabs().map((tab) => {
                    return <SmartTab key={tab.id} tab={tab} onSelect={onSelect} />
                })}
            </div>
        </div>
    )
}
