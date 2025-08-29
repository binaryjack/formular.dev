import { HeaderPresetType, IHeaderStyle } from 'formular.design.system'
import { IComponentStyleConfig } from 'formular.design.system/dist/utilities/generic-style/utils/atomic-style-builder'
import { ToggleableStateType } from 'formular.dev.lib/types/formular-dev.es'

export interface IAccordionContent {
    as?: keyof JSX.IntrinsicElements
    children: React.ReactNode
}

export interface IAccordionUIProps extends React.ComponentProps<'div'> {
    id: string
    title: string
    children: React.ReactNode
    variants?: Partial<IComponentStyleConfig>
    contentTabIndex?: number
    // NEW: Header preset support
    headerPreset?: HeaderPresetType
    headerStyle?: IHeaderStyle
}

export interface IAccordionProps extends React.ComponentProps<'div'> {
    id: string
    title: string
    children: React.ReactNode
    initialState?: ToggleableStateType
    contentTabIndex?: number
    variants?: Partial<IComponentStyleConfig>

    // NEW: Header preset support
    headerPreset?: HeaderPresetType
    headerStyle?: IHeaderStyle
}
