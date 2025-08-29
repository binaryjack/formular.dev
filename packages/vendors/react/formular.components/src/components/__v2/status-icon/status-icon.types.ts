import { IComponentStyleConfig } from 'formular.design.system/dist/utilities/generic-style/utils/atomic-style-builder'

export interface IStatusIconProps extends Partial<React.ComponentProps<'div'>> {
    id: string
    isLoading: boolean
    icon: React.ReactNode
    variants?: Partial<IComponentStyleConfig>
}
