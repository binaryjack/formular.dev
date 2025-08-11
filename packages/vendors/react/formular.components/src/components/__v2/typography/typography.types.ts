import { IComponentVariants } from 'formular.design.system'
/**
 * If we pass IGenericComponentVariantsV2 to `variants`, the genericStale class style builder will be invoked.
 * Alternatively, you can pass the parent's `render.foregroundClasses` (generated at the parent's level with compositeStyle).
 */
export interface ITypographyProps extends Omit<Partial<React.ComponentProps<any>>, 'className'> {
    as?: keyof JSX.IntrinsicElements
    children: React.ReactNode
    variants?: Omit<Partial<IComponentVariants>, 'ComponentTypes'> | string
}
