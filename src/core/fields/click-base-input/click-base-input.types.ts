import { IEvents } from '../../events/events.types'
import {
    IBaseField,
    IFieldInput,
    IFieldInputExtended
} from '../field-base-input/field-input-base-types'

export interface IClickField extends IBaseField {
    checked: boolean
    handleOnClick: <T extends IEvents>(data?: T) => void
}
export interface IClickInput extends IFieldInputExtended<IBaseField> {
    new (): IClickInput
    _field: IFieldInput
    field: () => IFieldInput
    checked?: boolean
    initialize: (fieldInput: IFieldInput) => void
    handleOnClicked: <T extends IEvents>(data?: T) => void
}
