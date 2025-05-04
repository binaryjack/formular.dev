import { FieldDataTypes } from '@core/framework/common/common.field.data.types'
import { IEvents } from '../../events/events.types'
import { IFieldInput, IFieldInputExtended } from '../field-base-input/field-input-base-types'

export interface ICheckBoxBaseInput extends IFieldInputExtended<IFieldInput> {
    new (): ICheckBoxBaseInput
    _field: IFieldInput
    field: () => IFieldInput
    initialize: (fieldInput: IFieldInput) => void
    ref: (ref: HTMLInputElement | null) => void
    register: () => void
    setValue: (value: FieldDataTypes) => void
    getValue: () => FieldDataTypes
    handleOnChanged: <T extends IEvents>(data?: T) => void
}
