import { IComponentStyleConfig } from 'formular.design.system/dist/utilities/generic-style/utils/atomic-style-builder'

export interface IBaseTextProps extends Partial<React.ComponentProps<'label'>> {
    text: string
    htmlFor?: string
    className?: string
    variants?: Partial<IComponentStyleConfig>
}
