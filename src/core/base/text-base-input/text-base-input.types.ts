import { IEvents } from '../events/events.types'
import { IFieldInput } from '../field-base-input/field-input-base-types'

export interface ITextBaseInput {
    new (field: IFieldInput): ITextBaseInput
    field: IFieldInput

    initialize: () => void

    setValue: (value: string | null) => void
    getValue: () => string | null
    handleOnChanged: <T extends IEvents>(data?: T) => void
    register: () => object
    getAsString: () => string | null
}
