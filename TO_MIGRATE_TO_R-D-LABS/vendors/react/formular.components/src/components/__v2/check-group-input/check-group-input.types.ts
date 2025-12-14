import { IComponentStyleConfig, IFieldLayouts } from 'formular.design.system'
import { IOptionItem } from 'formular.dev.lib'

export interface ICheckGroupInput extends React.ComponentProps<'div'>, IFieldLayouts {
    id: string
    options: IOptionItem[]
    onSelectOptions?: (option: IOptionItem[]) => void
    mainLabelVariants?: Partial<IComponentStyleConfig>
    variants?: Partial<IComponentStyleConfig>
}
