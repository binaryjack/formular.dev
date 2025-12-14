import { HeaderPresetType, IComponentStyleConfig, IHeaderStyle } from 'formular.design.system'

import type { ToggleableStateType } from 'formular.dev.lib'

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
