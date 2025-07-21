import useAppContext from '@components/context/app-context/app-context.context'
import { LayoutModeEnum } from '@components/layout/enum/layout-mode-enum'
import { Toggleable } from '@components/toggleable/toggleable'
import { SmartTabsDropDownContainer } from './components/smart-tabs-drop-down-container'
import { SmartTabsHorizontalContainer } from './components/smart-tabs-horizontal-container'
import { SmartTabsVerticalContainer } from './components/smart-tabs-vertical-container'
import { ITab } from './types/i-tab'
import { ITabManager } from './types/i-tab-manager'

export interface ISmartTabsContainerProps {
    manager: ITabManager
    onSelected: (tab: ITab) => void
}

export const SmartTabsContainer = ({ manager, onSelected }: ISmartTabsContainerProps) => {
    const { layoutMode, isMobileDevice } = useAppContext()

    const mode = isMobileDevice() ? layoutMode.mobile : layoutMode.desktop

    const handleOnSelect = (id: string) => {
        const tb = manager.getTabById(id)
        if (!tb) return
        manager.selectTab(id)
        onSelected(tb)
    }

    switch (mode) {
        case LayoutModeEnum.HORIZONTAL:
            return <SmartTabsHorizontalContainer manager={manager} onSelect={handleOnSelect} />
        case LayoutModeEnum.VERTICAL:
            return <SmartTabsVerticalContainer manager={manager} onSelect={handleOnSelect} />
        case LayoutModeEnum.MOBILE:
            return (
                <Toggleable>
                    <SmartTabsDropDownContainer manager={manager} onSelect={handleOnSelect} />
                </Toggleable>
            )
        default:
            return <>ERROR</>
    }
}
