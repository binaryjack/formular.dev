import useAppContext from '@components/context/app-context/app-context.context'
import { LayoutModeEnum } from '@components/layout/enum/layout-mode-enum'
import { Toggleable } from '@components/toggleable/toggleable'
import { SmartTabsDropDownContainer } from './components/smart-tabs-drop-down-container'
import { SmartTabsHorizontalContainer } from './components/smart-tabs-horizontal-container'
import { SmartTabsVerticalContainer } from './components/smart-tabs-vertical-container'
import { ISmartTabContainerContext, SmartTabContainerContext } from './smart-tabs-container.context'
import { ITab } from './types/i-tab'
import { ITabManager } from './types/i-tab-manager'

export interface ISmartTabsContainerProps {
    manager: ITabManager
    onSelected: (e: React.MouseEvent, tab: ITab) => void
}

export interface IRenderSmartTabsContainerProps {
    manager: ITabManager
    mode: LayoutModeEnum
}

const RenderSmartTab = ({ manager, mode }: IRenderSmartTabsContainerProps) => {
    switch (mode) {
        case LayoutModeEnum.HORIZONTAL:
            return <SmartTabsHorizontalContainer manager={manager} />
        case LayoutModeEnum.VERTICAL:
            return <SmartTabsVerticalContainer manager={manager} />
        case LayoutModeEnum.MOBILE:
            return (
                <Toggleable>
                    <SmartTabsDropDownContainer manager={manager} />
                </Toggleable>
            )
        default:
            return <>ERROR</>
    }
}

export const SmartTabsContainer = ({ manager, onSelected }: ISmartTabsContainerProps) => {
    const { layoutMode, isMobileDevice } = useAppContext()

    const mode = isMobileDevice() ? layoutMode.mobile : layoutMode.desktop

    const handleOnSelect = async (e: React.MouseEvent, tab: ITab) => {
        if (!tab) return
        manager.selectTab(tab.id)
        onSelected(e, tab)
    }

    const outputContext: ISmartTabContainerContext = {
        manager,
        selectTab: handleOnSelect
    }

    return (
        <SmartTabContainerContext.Provider value={outputContext}>
            <RenderSmartTab manager={manager} mode={mode} />
        </SmartTabContainerContext.Provider>
    )
}
