import { IComponentStyleConfig, IFieldLayouts } from 'formular.design.system'

import type { IOptionItem } from 'formular.dev.lib'

export interface IRadioInputProps extends React.ComponentProps<'div'>, IFieldLayouts {
    id: string
    options: IOptionItem[]
    initialSelectedOption?: number
    onSelectOption?: (option: IOptionItem) => void
    mainLabelVariants?: Partial<IComponentStyleConfig>
    variants?: Partial<IComponentStyleConfig>
}
