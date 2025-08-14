import { ComponentSizeType } from '@/types'
import { ResponsiveFormLayoutType } from './responsive-form-layout'

export type LayoutType = 1 | 2 | 3 | 4 | 6 | 12
export type OffsetType = 0 | 1 | 2 | 3 | 4 | 5 | 6

export type FlexDirectionType = 'row' | 'column'

export type FlexAlignementType = 'start' | 'center' | 'end' | 'stretch'

export type FieldProportionType = 'auto' | 'balanced' | 'label-wide' | 'input-wide' | 'custom'

export type FieldLayoutDirection = 'stack' | 'inline' | 'hybrid'

export interface IFieldProportions {
    labelWidth?: ResponsiveFormLayoutType<string>
    inputWidth?: ResponsiveFormLayoutType<string>
    commandWidth?: ResponsiveFormLayoutType<string>
    preset?: ResponsiveFormLayoutType<FieldProportionType>
    direction?: ResponsiveFormLayoutType<FieldLayoutDirection>
}

export interface IFormLayoutConfig {
    columns: ResponsiveFormLayoutType<LayoutType>
    gap: ResponsiveFormLayoutType<ComponentSizeType>
    fieldSpan: ResponsiveFormLayoutType<LayoutType>
    direction: ResponsiveFormLayoutType<FlexDirectionType>
    alignment: ResponsiveFormLayoutType<FlexAlignementType>
    fieldProportions?: IFieldProportions
}

export interface ILayoutClasses {
    containerClasses: string
    fieldSetClasses: string
    labelClasses: string
    inputContainerClasses: string
    commandClasses: string
    wrapperClasses: string
    inputCommandsWrapperClasses: string
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
        alignment: 'stretch',
        fieldProportions: {
            preset: 'balanced',
            direction: {
                '2xs': 'stack', // Stack on mobile
                xs: 'stack', // Stack on small mobile
                sm: 'hybrid', // Hybrid on small tablets (label top, input+commands inline)
                md: 'inline', // All inline on tablets+
                lg: 'inline',
                xl: 'inline',
                '2xl': 'inline'
            }
        }
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

    // Generate field element classes based on proportions
    const proportions = mergedLayout.fieldProportions
    const {
        labelClasses,
        inputContainerClasses,
        commandClasses,
        wrapperClasses,
        inputCommandsWrapperClasses
    } = generateFieldProportionClasses(proportions)

    return {
        containerClasses,
        fieldSetClasses,
        labelClasses,
        inputContainerClasses,
        commandClasses,
        wrapperClasses,
        inputCommandsWrapperClasses
    }
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

const generateFieldProportionClasses = (proportions?: IFieldProportions) => {
    const preset = proportions?.preset || 'balanced'
    const direction = proportions?.direction || {
        '2xs': 'stack',
        xs: 'stack',
        sm: 'hybrid',
        md: 'inline'
    }

    // Default presets for field proportions
    const presets = {
        auto: {
            labelClasses: 'w-auto flex-shrink-0',
            inputContainerClasses: 'flex-1 min-w-0',
            commandClasses: 'w-auto flex-shrink-0'
        },
        balanced: {
            labelClasses: 'w-full sm:w-1/3 flex-shrink-0',
            inputContainerClasses: 'flex-1 min-w-0',
            commandClasses: 'w-auto flex-shrink-0 sm:w-24'
        },
        'label-wide': {
            labelClasses: 'w-full sm:w-1/2 flex-shrink-0',
            inputContainerClasses: 'flex-1 min-w-0',
            commandClasses: 'w-auto flex-shrink-0'
        },
        'input-wide': {
            labelClasses: 'w-full sm:w-1/4 flex-shrink-0',
            inputContainerClasses: 'flex-1 min-w-0',
            commandClasses: 'w-auto flex-shrink-0 sm:w-20'
        },
        custom: {
            labelClasses: proportions?.labelWidth
                ? generateResponsiveClasses('w', proportions.labelWidth)
                : 'w-auto',
            inputContainerClasses: proportions?.inputWidth
                ? generateResponsiveClasses('w', proportions.inputWidth)
                : 'flex-1',
            commandClasses: proportions?.commandWidth
                ? generateResponsiveClasses('w', proportions.commandWidth)
                : 'w-auto'
        }
    }

    // Generate wrapper classes based on layout direction
    const wrapperClasses = generateDirectionClasses(direction)
    const inputCommandsWrapperClasses = generateInputCommandsWrapperClasses(direction)

    // Get base classes from preset
    let baseClasses
    if (typeof preset === 'string') {
        baseClasses = presets[preset] || presets.balanced
    } else {
        // Handle responsive presets
        baseClasses = {
            labelClasses: generateResponsivePresetClasses('label', preset, presets),
            inputContainerClasses: generateResponsivePresetClasses('input', preset, presets),
            commandClasses: generateResponsivePresetClasses('command', preset, presets)
        }
    }

    return {
        ...baseClasses,
        wrapperClasses,
        inputCommandsWrapperClasses
    }
}

const generateResponsivePresetClasses = (
    element: 'label' | 'input' | 'command',
    presetValues: ResponsiveFormLayoutType<FieldProportionType>,
    presets: any
) => {
    if (typeof presetValues === 'string') {
        const preset = presets[presetValues] || presets.balanced
        return element === 'label'
            ? preset.labelClasses
            : element === 'input'
              ? preset.inputContainerClasses
              : preset.commandClasses
    }

    return Object.entries(presetValues)
        .map(([breakpoint, presetName]) => {
            const preset = presets[presetName as FieldProportionType] || presets.balanced
            const baseClass =
                element === 'label'
                    ? preset.labelClasses.split(' ')[0] // Get base width class
                    : element === 'input'
                      ? preset.inputContainerClasses.split(' ')[0]
                      : preset.commandClasses.split(' ')[0]

            if (breakpoint === '2xs') return baseClass
            return `${breakpoint}:${baseClass}`
        })
        .join(' ')
}

const generateDirectionClasses = (direction: ResponsiveFormLayoutType<FieldLayoutDirection>) => {
    if (typeof direction === 'string') {
        return getDirectionClass(direction)
    }

    return Object.entries(direction)
        .map(([breakpoint, dir]) => {
            const baseClass = getDirectionClass(dir)
            if (breakpoint === '2xs') return baseClass
            return `${breakpoint}:${baseClass}`
        })
        .join(' ')
}

const getDirectionClass = (direction: FieldLayoutDirection) => {
    switch (direction) {
        case 'stack':
            return 'flex-col gap-2'
        case 'hybrid':
            return 'flex-col gap-2' // Same as stack for main wrapper
        case 'inline':
            return 'flex-row items-center gap-4'
        default:
            return 'flex-col gap-2'
    }
}

const generateInputCommandsWrapperClasses = (
    direction: ResponsiveFormLayoutType<FieldLayoutDirection>
) => {
    if (typeof direction === 'string') {
        return getInputCommandsWrapperClass(direction)
    }

    return Object.entries(direction)
        .map(([breakpoint, dir]) => {
            const baseClass = getInputCommandsWrapperClass(dir)
            if (breakpoint === '2xs') return baseClass
            return `${breakpoint}:${baseClass}`
        })
        .join(' ')
}

const getInputCommandsWrapperClass = (direction: FieldLayoutDirection) => {
    switch (direction) {
        case 'stack':
            return 'flex flex-col gap-2 w-full'
        case 'hybrid':
            return 'flex flex-row items-center gap-2 w-full' // Input and commands inline in hybrid mode
        case 'inline':
            return '' // Not used in inline mode, elements are direct children
        default:
            return 'flex flex-col gap-2 w-full'
    }
}
