import { IExtendedInputBase } from '@core/field-engine/core/input-base/input-base.types'
import { IEvents } from '@core/framework/events/events.types'

export interface IClickBaseInputProperties {}

export interface IClickBaseInput extends IClickBaseInputProperties, IExtendedInputBase {
    new (): IClickBaseInput
    handleOnClicked: <T extends IEvents>(data?: T) => void
}
