import { IGenericComponentVariants } from 'formular.design.system'
import { IOptionItem, ToggleableStateType } from 'formular.dev.lib/types/formular-dev.es'

export interface IDropdown extends React.ComponentProps<'div'> {
    id: string
    label: string
    options: IOptionItem[]
    initialState?: ToggleableStateType
    onSelectedOption?: (option: IOptionItem) => void
    variants?: Partial<IGenericComponentVariants>
}
