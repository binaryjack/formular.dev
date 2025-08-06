import { IGenericComponentVariants } from 'formular.design.system'
import { IOptionItem } from 'formular.dev.lib/types/formular-dev.es'

export interface IRadioInputProps extends React.ComponentProps<'div'> {
    id: string
    options: IOptionItem[]
    initialSelectedOption?: number
    onSelectOption?: (option: IOptionItem) => void
    variants?: Partial<IGenericComponentVariants>
}
