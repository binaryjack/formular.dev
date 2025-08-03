import { ToggleableStateType } from 'formular.dev.lib/types/formular-dev.es'

export interface IAccordionProps extends React.ComponentProps<'div'> {
    id: string
    title: string
    children: React.ReactNode
    initialState?: ToggleableStateType
}
