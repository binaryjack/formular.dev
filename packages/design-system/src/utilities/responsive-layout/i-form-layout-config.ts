import { ComponentSizeType } from '@/types'
import { ResponsiveFormLayoutType } from './responsive-form-layout'

export type LayoutType = 1 | 2 | 3 | 4 | 6 | 12
export type OffsetType = 0 | 1 | 2 | 3 | 4 | 5 | 6

export type FlexDirectionType = 'row' | 'column'

export type FlexAlignementType = 'start' | 'center' | 'end' | 'stretch'

export interface IFormLayoutConfig {
    columns: ResponsiveFormLayoutType<LayoutType>
    gap: ResponsiveFormLayoutType<ComponentSizeType>
    fieldSpan: ResponsiveFormLayoutType<LayoutType>
    direction: ResponsiveFormLayoutType<FlexDirectionType>
    alignment: ResponsiveFormLayoutType<FlexAlignementType>
}

export interface ILayoutClasses {
    containerClasses: string
    fieldSetClasses: string
}

export interface IFieldLayout {
    span?: ResponsiveFormLayoutType<LayoutType>
    offset?: ResponsiveFormLayoutType<OffsetType>
    order?: ResponsiveFormLayoutType<number>
}

export interface IFieldLayouts {
    layout?: Partial<IFormLayoutConfig>
    layoutSet?: IFieldLayout
}

export const generateLayoutClasses = (variants: IFieldLayouts): ILayoutClasses => {
    const { layout = {}, layoutSet: fieldSet = {} } = variants

    const defaultLayout: IFormLayoutConfig = {
        columns: {
            '2xs': 1,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 3,
            '2xl': 4
        },
        gap: {
            '2xs': 'sm',
            sm: 'md',
            lg: 'lg'
        },
        fieldSpan: 1,
        direction: 'column',
        alignment: 'stretch'
    }

    // Merge with user config
    const mergedLayout = { ...defaultLayout, ...layout }
    // Generate container classes
    const containerClasses = [
        'form-layout',
        'grid',
        'w-full',
        generateResponsiveClasses('grid-cols', mergedLayout.columns),
        generateResponsiveClasses('gap', mergedLayout.gap),
        generateResponsiveClasses('items', mergedLayout.alignment)
    ]
        .filter(Boolean)
        .join(' ')

    const fieldSetClasses = [
        'form-fieldset',
        'relative',
        generateResponsiveClasses('col-span', fieldSet.span || 1),
        fieldSet.offset && generateResponsiveClasses('col-start', fieldSet.offset),
        fieldSet.order && generateResponsiveClasses('order', fieldSet.order)
    ]
        .filter(Boolean)
        .join(' ')

    return { containerClasses, fieldSetClasses }
}

const generateResponsiveClasses = <T>(
    property: string,
    values: ResponsiveFormLayoutType<T>
): string => {
    if (typeof values !== 'object' || values === null) {
        return `${property}-${values}`
    }

    return Object.entries(values)
        .map(([breakpoint, value]) => {
            if (breakpoint === '2xs') return `${property}-${value}`
            return `${breakpoint}:${property}-${value}`
        })
        .join(' ')
}
