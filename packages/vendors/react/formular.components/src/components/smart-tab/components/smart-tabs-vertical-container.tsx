import { cx } from 'formular.design.system'
import { ITabManager } from '../types/i-tab-manager'
import { SmartTab } from './smart-tab'

export interface ISmartTabsVerticalContainerProps {
    manager: ITabManager
}

export const SmartTabsVerticalContainer = ({ manager }: ISmartTabsVerticalContainerProps) => {
    return (
        <div className={cx('flex p-1')}>
            <div className={cx('flex flex-col overflow-y-auto')}>
                {manager.getTabs().map((tab) => {
                    return <SmartTab key={tab.id} tab={tab} />
                })}
            </div>
        </div>
    )
}
