import { IComponentStyleConfig } from 'formular.design.system/dist/utilities/generic-style/utils/atomic-style-builder'

export interface ILabelProps extends Partial<React.ComponentProps<'label'>> {
    htmlFor: string
    text: string
    tabindex?: number
    variants?: Partial<IComponentStyleConfig>
}
