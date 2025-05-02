import { IFValueTypes } from '@dependency/schema/descriptor/field.data.types'
import { IEvents } from '../../events/events.types'
import { IFieldInput, IFieldInputExtended } from '../field-base-input/field-input-base-types'

export interface ICheckBoxInput extends IFieldInputExtended<IFieldInput> {
    new (): ICheckBoxInput
    _field: IFieldInput
    field: () => IFieldInput
    initialize: (fieldInput: IFieldInput) => void
    ref: (ref: HTMLInputElement | null) => void
    register: () => void
    setValue: (value: IFValueTypes) => void
    getValue: () => IFValueTypes
    handleOnChanged: <T extends IEvents>(data?: T) => void
}
