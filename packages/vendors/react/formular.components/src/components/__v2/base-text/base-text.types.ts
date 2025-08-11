import { IComponentVariants } from 'formular.design.system'

export interface IBaseTextProps extends Partial<React.ComponentProps<'label'>> {
    text: string
    htmlFor?: string
    className?: string
    variants?: Omit<Partial<IComponentVariants>, 'ComponentTypes'>
}
