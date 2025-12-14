import { IComponentStyleConfig } from 'formular.design.system'

export interface IStatusIconProps extends Partial<React.ComponentProps<'div'>> {
    id: string
    isLoading: boolean
    icon: React.ReactNode
    variants?: Partial<IComponentStyleConfig>
}
