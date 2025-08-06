import { IGenericComponentVariantsV2 } from 'formular.design.system'

export interface ILabelProps extends Omit<Partial<React.ComponentProps<'label'>>, 'className'> {
    htmlFor: string
    text: string
    variants?: Partial<IGenericComponentVariantsV2>
}
