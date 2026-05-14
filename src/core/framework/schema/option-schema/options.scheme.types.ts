// Basic option item type for select, radio, and other option-based inputs
export interface IOptionItem {
    id?: string | number
    sequenceId?: number
    text?: string
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
