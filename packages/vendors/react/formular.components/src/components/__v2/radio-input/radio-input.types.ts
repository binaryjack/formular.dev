import { IOptionItem } from 'formular.dev.lib/types/formular-dev.es'

export interface IRadioInputProps extends React.ComponentProps<'div'> {
    id: string
    options: IOptionItem[]
    initialSelectedOption?: number
    size: number
    onSelectOption?: (option: IOptionItem) => void
}
