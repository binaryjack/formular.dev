import { IExtendedInputBase } from '../field-base-input/field-input-base-types'
import { ToggleableStateType } from '../toggleable-base-element/toggleable-base-element'

export interface IDrawerBaseInputProperties {
    openState: ToggleableStateType
}

export interface IDrawerBaseInput extends IDrawerBaseInputProperties, IExtendedInputBase {
    new (): IDrawerBaseInput
    setOpenState: (state: ToggleableStateType) => void
}
