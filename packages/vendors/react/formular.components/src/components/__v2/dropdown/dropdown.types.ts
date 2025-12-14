import { IComponentStyleConfig, IFieldLayouts } from 'formular.design.system'

import type { IOptionItem, ToggleableStateType } from 'formular.dev.lib'

export interface IDropdownUIProps extends React.ComponentProps<'div'>, IFieldLayouts {
    id: string
    label: string
    options: IOptionItem[]
    initialState?: ToggleableStateType
    onSelectedOption?: (option: IOptionItem) => void
    variants?: Partial<IComponentStyleConfig>
}

export interface IDropdownItemProps extends React.ComponentProps<'div'> {
    option: IOptionItem
    toggleContextId: string
    isHighlighted: boolean
    onSelectedOption: (option: IOptionItem) => void
}

export interface IDropdownProps extends React.ComponentProps<'div'>, IFieldLayouts {
    id: string
    label: string
    options: IOptionItem[]
    initialState?: ToggleableStateType
    onSelectedOption?: (option: IOptionItem) => void
    variants?: Partial<IComponentStyleConfig>
}

export interface IDropdownDrawerContent {
    filteredOptions: IOptionItem[]
    toggleContextId: string
    onSelectedOption: (option: IOptionItem) => void
}
