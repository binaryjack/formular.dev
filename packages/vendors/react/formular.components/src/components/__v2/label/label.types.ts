import { IGenericComponentVariants } from 'formular.design.system'

export interface ILabelProps extends React.ComponentProps<'label'> {
    htmlFor: string
    text: string
    variants?: Partial<IGenericComponentVariants>
}
