import { IFValueTypes } from '@dependency/schema/descriptor/field.data.types'
import { IEvents } from '../../events/events.types'
import { IFieldInput, IFieldInputExtended } from '../field-base-input/field-input-base-types'

export interface ITextInput extends IFieldInputExtended<IFieldInput> {
    new (): ITextInput
    _field: IFieldInput
    field: () => IFieldInput
    initialize: (fieldInput: IFieldInput) => void
    ref: (ref: HTMLInputElement | null) => void
    register: () => void
    setValue: (value: IFValueTypes) => void
    getValue: () => IFValueTypes
    handleOnChanged: <T extends IEvents>(data?: T) => void
}
