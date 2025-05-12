import { ToggleableStateType } from '@core/framework/common/common.toggleable'
import { IExtendedInputBase } from '@core/input-engine/core/input-base/input-base.types'

export interface IDrawerBaseInputProperties {
    openState: ToggleableStateType
}

export interface IDrawerBaseInput extends IDrawerBaseInputProperties, IExtendedInputBase {
    new (): IDrawerBaseInput
    setOpenState: (state: ToggleableStateType) => void
}
