import { IEvents } from '../../events/events.types'
import { IConstructor } from '../field-base-input/constructors/constructors'
import { IExtendedInputBase } from '../field-base-input/field-input-base-types'
export interface IClickBaseInputProperties {}

export interface IClickBaseInput extends IClickBaseInputProperties, IExtendedInputBase {
    new (constructor: IConstructor): IClickBaseInput
    initialize: () => void
    handleOnClicked: <T extends IEvents>(data?: T) => void
}
