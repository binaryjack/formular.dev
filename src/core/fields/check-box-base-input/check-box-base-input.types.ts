import { IEvents } from '../../events/events.types'
import { IClickBaseInput } from '../click-base-input/click-base-input.types'
import { IExtendedInputBase } from '../field-base-input/field-input-base-types'

export interface ICheckBoxBaseInputProperties {
    clickBase: IClickBaseInput
    checked?: boolean
}

export interface ICheckBoxBaseInput extends ICheckBoxBaseInputProperties, IExtendedInputBase {
    new (): ICheckBoxBaseInput
    handleOnChanged: <T extends IEvents>(data?: T) => void
}
