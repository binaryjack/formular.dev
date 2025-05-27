import { ChevronToggleButton } from '@components/chevron-toggle-button/chevron-toggle-button'
import { conventions } from '@components/context/conventions/conventions'
import { useToggleableContext } from '@components/toggleable/toggleable.context.hook'
import { ToggleableStateType } from '@core/framework/common/common.toggleable'
import { ITabManager } from '../types/i-tab-manager'
import { SmartTab } from './smart-tab'
import './smart-tabs-drop-down-container.css'
export interface ISmartTabsDropDownContainerProps {
    manager: ITabManager
    onSelect: (tabId: string) => void
}

export const SmartTabsDropDownContainer = ({
    manager,
    onSelect
}: ISmartTabsDropDownContainerProps) => {
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
                        variantProperties={conventions.commands.basic}
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
                    return <SmartTab key={tab.id} tab={tab} onSelect={onSelect} />
                })}
            </div>
        </div>
    )
}
