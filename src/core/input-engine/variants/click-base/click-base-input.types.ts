import { IEvents } from '@core/framework/events/events.types'
import { IExtendedInputBase } from '@core/input-engine/core/input-base/input-base.types'

export interface IClickBaseInputProperties {}

export interface IClickBaseInput extends IClickBaseInputProperties, IExtendedInputBase {
    new (): IClickBaseInput
    onClickHandle: <T extends IEvents>(data?: T) => void
}
