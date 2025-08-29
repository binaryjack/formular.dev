import { IFieldLayouts } from 'formular.design.system'
import { IComponentStyleConfig } from 'formular.design.system/dist/utilities/generic-style/utils/atomic-style-builder'
import { IOptionItem } from 'formular.dev.lib'

export interface ICheckGroupInput extends React.ComponentProps<'div'>, IFieldLayouts {
    id: string
    options: IOptionItem[]
    onSelectOptions?: (option: IOptionItem[]) => void
    mainLabelVariants?: Partial<IComponentStyleConfig>
    variants?: Partial<IComponentStyleConfig>
}
