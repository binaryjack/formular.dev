// Basic option item type for select, radio, and other option-based inputs
export interface IOptionItem {
    value: string | number | boolean
    label: string
    selected?: boolean
    disabled?: boolean
    group?: string
    data?: any
}

// Helper type for option arrays
export type OptionList = IOptionItem[]

// Option group interface
export interface IOptionGroup {
    label: string
    options: IOptionItem[]
    disabled?: boolean
}
