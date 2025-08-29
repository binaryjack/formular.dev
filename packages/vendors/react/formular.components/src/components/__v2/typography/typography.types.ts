import { IComponentStyleConfig } from 'formular.design.system/dist/utilities/generic-style/utils/atomic-style-builder'

/**
 * If we pass IGenericComponentVariantsV2 to `variants`, the genericStale class style builder will be invoked.
 * Alternatively, you can pass the parent's `render.foregroundClasses` (generated at the parent's level with compositeStyle).
 */
export interface ITypographyProps extends Omit<Partial<React.ComponentProps<any>>, 'className'> {
    as?: keyof JSX.IntrinsicElements
    children: React.ReactNode
    tabindex?: number
    disableGenericText?: boolean
    variants?: Partial<IComponentStyleConfig>
}
