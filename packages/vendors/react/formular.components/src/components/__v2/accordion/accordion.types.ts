import { IComponentVariants } from 'formular.design.system'
import { ToggleableStateType } from 'formular.dev.lib/types/formular-dev.es'

export interface IAccordionUIProps extends React.ComponentProps<'div'> {
    id: string
    title: string
    children: React.ReactNode
    variants?: Omit<Partial<IComponentVariants>, 'ComponentTypes'>
}

export interface IAccordionProps extends React.ComponentProps<'div'> {
    id: string
    title: string
    children: React.ReactNode
    initialState?: ToggleableStateType
    variants?: Omit<Partial<IComponentVariants>, 'ComponentTypes'>
}
