import { IEvents } from '../events/events.types'
import { IFieldInput } from '../field-base-input/field-input-base-types'

export interface IClickBaseInput {
    new (field: IFieldInput): IClickBaseInput
    checked?: boolean
    field: IFieldInput
    intitialize: () => void
    handleOnClicked: <T extends IEvents>(this: IClickBaseInput, data?: T) => void
    register: () => object
    setValue: (value: boolean | null) => void
    getValue: () => boolean | null
}
