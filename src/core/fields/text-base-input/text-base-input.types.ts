import { IEvents } from '@core/events/events.types'
import { FieldDataTypes } from '@core/framework/common/common.field.data.types'
import {
    IFieldBaseInput,
    IFieldInput,
    IFieldInputExtended
} from '../field-base-input/field-input-base-types'

export interface ITextBaseInput extends IFieldInputExtended {
    new (): ITextBaseInput
    _field: IFieldInput
    field: () => IFieldInput
    initialize: (fieldInput: IFieldBaseInput) => void
    ref: (ref: HTMLInputElement | null) => void
    register: () => any
    setValue: (value: FieldDataTypes) => void
    getValue: () => FieldDataTypes
    handleOnChanged: <T extends IEvents>(data?: T) => void
}
