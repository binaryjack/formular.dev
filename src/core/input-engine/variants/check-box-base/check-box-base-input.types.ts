import { IExtendedInputBase } from '@core/input-engine/core/input-base/input-base.types'
import { IClickBaseInput } from '../click-base/click-base-input.types'
export const SCheckBoxBaseInput = Symbol.for('ICheckBoxBaseInput')
export interface ICheckBoxBaseInputProperties {
    clickBase: IClickBaseInput
    checked?: boolean
}

export interface ICheckBoxBaseInput extends ICheckBoxBaseInputProperties, IExtendedInputBase {
    new (): ICheckBoxBaseInput
}
