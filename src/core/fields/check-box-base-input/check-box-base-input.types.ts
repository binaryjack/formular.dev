import { IEvents } from '../../events/events.types'
import { IClickBaseInput } from '../click-base-input/click-base-input.types'
import { IConstructor } from '../field-base-input/constructors/constructors'
import { IExtendedInputBase } from '../field-base-input/field-input-base-types'

export interface ICheckBoxBaseInputProperties {
    clickBase: IClickBaseInput
    checked?: boolean
}

export interface ICheckBoxBaseInput extends ICheckBoxBaseInputProperties, IExtendedInputBase {
    new (constructor: IConstructor): ICheckBoxBaseInput
    handleOnChanged: <T extends IEvents>(data?: T) => void
    initialize: () => void
}
