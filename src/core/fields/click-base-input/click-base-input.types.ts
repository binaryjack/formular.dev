import { IEvents } from '../../events/events.types'
import {
    IFieldBaseInput,
    IFieldInput,
    IFieldInputExtended
} from '../field-base-input/field-input-base-types'

export interface IClickBaseInput extends IFieldInputExtended {
    new (): IClickBaseInput
    _field: IFieldInput
    field: () => IFieldInput
    checked?: boolean
    initialize: (fieldInput: IFieldBaseInput) => void
    handleOnClicked: <T extends IEvents>(data?: T) => void
}
