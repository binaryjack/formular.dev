import { IEvents } from '../../events/events.types'
import { IExtendedInputBase } from '../field-base-input/field-input-base-types'
export interface IClickBaseInputProperties {}

export interface IClickBaseInput extends IClickBaseInputProperties, IExtendedInputBase {
    new (): IClickBaseInput
    handleOnClicked: <T extends IEvents>(data?: T) => void
}
