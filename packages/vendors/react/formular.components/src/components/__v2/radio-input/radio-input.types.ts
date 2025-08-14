import { IComponentVariants, IFieldLayouts } from 'formular.design.system'

import { IOptionItem } from 'formular.dev.lib/types/formular-dev.es'

export interface IRadioInputProps extends React.ComponentProps<'div'>, IFieldLayouts {
    id: string
    options: IOptionItem[]
    initialSelectedOption?: number
    onSelectOption?: (option: IOptionItem) => void
    mainLabelVariants?: Omit<Partial<IComponentVariants>, 'ComponentTypes'>
    variants?: Omit<Partial<IComponentVariants>, 'ComponentTypes'>
}
