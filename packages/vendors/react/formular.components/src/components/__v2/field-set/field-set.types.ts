import { IFieldLayouts } from 'formular.design.system'

export interface IFieldSetProps extends React.ComponentProps<'div'>, IFieldLayouts {
    label: React.ReactNode
    input: React.ReactNode
    buttons: React.ReactNode
}
