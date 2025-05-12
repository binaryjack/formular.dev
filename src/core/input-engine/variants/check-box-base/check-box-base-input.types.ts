import { IEvents } from '@core/framework/events/events.types'
import { IExtendedInputBase } from '@core/input-engine/core/input-base/input-base.types'
import { IClickBaseInput } from '../click-base/click-base-input.types'

export interface ICheckBoxBaseInputProperties {
    clickBase: IClickBaseInput
    checked?: boolean
}

export interface ICheckBoxBaseInput extends ICheckBoxBaseInputProperties, IExtendedInputBase {
    new (): ICheckBoxBaseInput
    handleOnChanged: <T extends IEvents>(data?: T) => void
}
