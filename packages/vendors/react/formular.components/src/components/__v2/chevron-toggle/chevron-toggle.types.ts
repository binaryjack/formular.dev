import { IComponentVariants } from 'formular.design.system'
import { ToggleableStateType } from 'formular.dev.lib/types/formular-dev.es'

export interface IChevronToggleProps {
    id: string
    toggleContextId: string
    initialToggleState: ToggleableStateType
    onToggle?: (
        e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<unknown>,
        state: ToggleableStateType
    ) => void
    variants?: Omit<Partial<IComponentVariants>, 'ComponentTypes'>
    tabIndex?: number
}
