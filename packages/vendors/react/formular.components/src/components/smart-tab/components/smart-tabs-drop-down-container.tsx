import { ChevronToggleButton } from '@components/chevron-toggle-button/chevron-toggle-button'

import { useToggleableContext } from '@components/toggleable/toggleable.context.hook'

import { ToggleableStateType } from 'formular.dev.lib'
import { ITabManager } from '../types/i-tab-manager'
import { SmartTab } from './smart-tab'
export interface ISmartTabsDropDownContainerProps {
    manager: ITabManager
}

export const SmartTabsDropDownContainer = ({ manager }: ISmartTabsDropDownContainerProps) => {
    const { setToggleState, toggleState } = useToggleableContext()

    const handleToggleState = (e: React.MouseEvent, state: ToggleableStateType) => {
        if (state === toggleState) return
        setToggleState(state)
        e?.stopPropagation?.()
        e?.preventDefault?.()
    }
    return (
        <div className={`smart-tabs-drop-down-container`}>
            <div className="smart-tabs-header">
                <div className="smart-tabs-header-text ">Mobile Container</div>
                <div className="smart-tabs-header-button flex">
                    <ChevronToggleButton
                        id={`smart-tabs-dropdown-button`}
                        toggleState={toggleState}
                        handleDrawerOpenState={handleToggleState}
                    />
                </div>
            </div>

            <div
                className={`tabs-container ${toggleState}  `}
                style={{
                    transformOrigin: 'top',
                    animation:
                        toggleState === 'open'
                            ? `openSmartTabsY 0.2s ease-in-out forwards`
                            : toggleState === 'closed'
                              ? `closeSmartTabsY 0.2s ease-in-out forwards`
                              : 'idleSmartTabs forwards'
                }}
            >
                {manager.getTabs().map((tab) => {
                    return <SmartTab key={tab.id} tab={tab} />
                })}
            </div>
        </div>
    )
}
