import { IEvents } from '../../events/events.types'
import { IFieldInput, IFieldInputExtended } from '../field-base-input/field-input-base-types'

export interface IClickInput extends IFieldInputExtended<IFieldInput> {
    new (): IClickInput
    _field: IFieldInput
    field: () => IFieldInput
    checked?: boolean
    initialize: (fieldInput: IFieldInput) => void
    handleOnClicked: <T extends IEvents>(data?: T) => void
}
