import { IEvents } from '../../events/events.types'
import { IFieldInput, IFieldInputExtended } from '../field-base-input/field-input-base-types'

export interface IClickBaseInput extends IFieldInputExtended {
    new (): IClickBaseInput
    _field: IFieldInput
    field: () => IFieldInput
    checked?: boolean
    initialize: (fieldInput: IFieldInputExtended) => void
    handleOnClicked: <T extends IEvents>(data?: T) => void
}
