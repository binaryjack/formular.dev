import { ToggleableStateType } from 'formular.dev.lib/types/formular-dev.es'
import { IComponentVariants } from '../component-variants'

export interface IChevronToggleProps {
    id: string
    toggleContextId: string
    initialToggleState: ToggleableStateType
    onToggle?: (e: React.MouseEvent<HTMLButtonElement>, state: ToggleableStateType) => void
    variants?: Partial<IComponentVariants>
}
