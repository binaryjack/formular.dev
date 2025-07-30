import { ToggleableStateType } from 'formular.dev.lib/types/formular-dev.es'
import { IButtonOptions } from '../button/button.types'

export interface IChevronToggleProps {
    id: string
    toggleContextId: string
    initialToggleState: ToggleableStateType
    onToggle?: (e: React.MouseEvent<HTMLButtonElement>, state: ToggleableStateType) => void
    options?: Partial<IButtonOptions>
}
