import { cx } from 'formular.design.system'
import { ITabManager } from '../types/i-tab-manager'
import { SmartTab } from './smart-tab'

export interface ISmartTabsHorizontalContainerProps {
    manager: ITabManager
}

export const SmartTabsHorizontalContainer = ({ manager }: ISmartTabsHorizontalContainerProps) => {
    return (
        <div className={cx('flex overflow-x-auto border-b border-secondary-200')}>
            <div className={cx('flex')}>
                {manager.getTabs().map((tab) => {
                    return <SmartTab key={tab.id} tab={tab} />
                })}
            </div>
        </div>
    )
}
