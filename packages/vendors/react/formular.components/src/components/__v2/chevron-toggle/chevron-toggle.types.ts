import { IComponentStyleConfig } from 'formular.design.system/dist/utilities/generic-style/utils/atomic-style-builder'
import { ToggleableStateType } from 'formular.dev.lib/types/formular-dev.es'

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
