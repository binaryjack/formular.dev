import { IGenericComponentVariantsV2 } from 'formular.design.system'

export interface ITypographyProps extends Omit<Partial<React.ComponentProps<any>>, 'className'> {
    as?: keyof JSX.IntrinsicElements
    children: React.ReactNode
    variants?: Partial<IGenericComponentVariantsV2>
}
