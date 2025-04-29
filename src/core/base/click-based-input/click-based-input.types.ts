export interface IClickBasedInput {
    new (): IClickBasedInput
    checked?: boolean

    intitialize: () => void

    register: () => object
    setValue: (value: boolean | null) => void
    getValue: () => boolean | null
}
