import useAppContext from '@components/context/app-context/app-context.context'
import { Toggleable } from '@components/toggleable/toggleable'
import { useEffect, useState } from 'react'
import { SmartTabsDropDownContainer } from './components/smart-tabs-drop-down-container'
import { SmartTabsHorizontalContainer } from './components/smart-tabs-horizontal-container'
import { SmartTabsVerticalContainer } from './components/smart-tabs-vertical-container'
import { SmartTabsModeEnum } from './enum/smart-tabs-mode-enum'
import { ITab } from './types/i-tab'
import { ITabManager } from './types/i-tab-manager'

export interface ISmartTabsContainerProps {
    manager: ITabManager
    onSelected: (tab: ITab) => void
}

export const SmartTabsContainer = ({ manager, onSelected }: ISmartTabsContainerProps) => {
    const { media } = useAppContext()
    const [mode, setMode] = useState<SmartTabsModeEnum | undefined>()
    useEffect(() => {
        if (media?.media === undefined) return
        const mode = ['sm', 'md'].includes(media.media)
            ? SmartTabsModeEnum.VERTICAL
            : ['2xs', 'xs'].includes(media.media)
              ? SmartTabsModeEnum.MOBILE
              : SmartTabsModeEnum.HORIZONTAL

        setMode(mode)
    }, [media?.media])

    const handleModeChange = () => {}

    const handleOnSelect = (id: string) => {
        const tb = manager.getTabById(id)
        if (!tb) return
        onSelected(tb)
    }

    switch (mode) {
        case SmartTabsModeEnum.HORIZONTAL:
            return <SmartTabsHorizontalContainer manager={manager} onSelect={handleOnSelect} />
        case SmartTabsModeEnum.VERTICAL:
            return <SmartTabsVerticalContainer manager={manager} onSelect={handleOnSelect} />
        case SmartTabsModeEnum.MOBILE:
            return (
                <Toggleable>
                    <SmartTabsDropDownContainer manager={manager} onSelect={handleOnSelect} />
                </Toggleable>
            )
        default:
            return <>ERROR</>
    }
}
