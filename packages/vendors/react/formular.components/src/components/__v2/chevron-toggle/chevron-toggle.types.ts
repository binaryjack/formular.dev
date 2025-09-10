import { IComponentStyleConfig } from 'formular.design.system'

import type { ToggleableStateType } from 'formular.dev.lib'

export interface IChevronToggleProps {
    id: string
    toggleContextId: string
    initialToggleState: ToggleableStateType
    onToggle?: (
        e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<unknown>,
        state: ToggleableStateType
    ) => void
    variants?: Partial<IComponentStyleConfig>
    tabIndex?: number
}
