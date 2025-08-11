import { IComponentVariants } from 'formular.design.system'

export interface ILabelProps extends Partial<React.ComponentProps<'label'>> {
    htmlFor: string
    text: string
    variants?: Omit<Partial<IComponentVariants>, 'ComponentTypes'> | string
}
