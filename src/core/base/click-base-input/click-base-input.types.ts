import { IFieldInput } from '../field-base-input/field-input-base-types'

export interface IClickBaseInput {
    new (field: IFieldInput): IClickBaseInput
    checked?: boolean
    field: IFieldInput
    intitialize: () => void

    register: () => object
    setValue: (value: boolean | null) => void
    getValue: () => boolean | null
}
