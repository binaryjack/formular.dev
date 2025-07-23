import { cx } from 'formular.design.system'
import { ITabManager } from '../types/i-tab-manager'
import { SmartTab } from './smart-tab'

export interface ISmartTabsVerticalContainerProps {
    manager: ITabManager
}

export const SmartTabsVerticalContainer = ({ manager }: ISmartTabsVerticalContainerProps) => {
    return (
        <div className={cx('flex flex-1 w-[200px] overflow-hidden')}>
            <div className={cx('flex flex-col flex-1 ')}>
                {manager.getTabs().map((tab) => {
                    return <SmartTab key={tab.id} tab={tab} />
                })}
            </div>
        </div>
    )
}
