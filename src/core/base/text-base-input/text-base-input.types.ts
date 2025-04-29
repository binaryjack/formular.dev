import { IFieldInput } from '../field-base-input/field-input-base-types'

export interface ITextBaseInput {
    new (field: IFieldInput): ITextBaseInput
    field: IFieldInput

    initialize: () => void

    setValue: (value: string | null) => void
    getValue: () => string | null

    register: () => object
    getAsString: () => string | null
}
