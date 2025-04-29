import { IFieldInput } from '../abstract-base-input/field-input-base-types'

export interface ITextBasedInput {
    new (field: IFieldInput): ITextBasedInput
    field: IFieldInput

    initialize: () => void

    setValue: (value: string | null) => void
    getValue: () => string | null

    register: () => object
    getAsString: () => string | null
}
