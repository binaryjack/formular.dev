import { IExtendedInputBase } from '@core/field-engine/core/input-base/field-input-base-types'
import { ToggleableStateType } from '@core/framework/common/common.toggleable'

export interface IDrawerBaseInputProperties {
    openState: ToggleableStateType
}

export interface IDrawerBaseInput extends IDrawerBaseInputProperties, IExtendedInputBase {
    new (): IDrawerBaseInput
    setOpenState: (state: ToggleableStateType) => void
}
