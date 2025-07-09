import { cx } from 'formular.design.system'
import { ITabManager } from '../types/i-tab-manager'
import { ITabManagerMock } from '../types/i-tab-manager-mock'
import { SmartTab } from './smart-tab'

export interface ISmartTabsHorizontalContainerProps {
    manager: ITabManager | ITabManagerMock
    onSelect: (tabId: string) => void
}

export const SmartTabsHorizontalContainer = ({
    manager,
    onSelect
}: ISmartTabsHorizontalContainerProps) => {
    return (
        <div className={cx('flex overflow-x-auto border-b border-secondary-200')}>
            <div className={cx('flex')}>
                {manager.getTabs().map((tab) => {
                    return <SmartTab key={tab.id} tab={tab} onSelect={onSelect} />
                })}
            </div>
        </div>
    )
}
