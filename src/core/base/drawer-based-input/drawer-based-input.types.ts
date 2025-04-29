import { IFieldInput } from '../abstract-base-input/field-input-base-types'
import { ToggleableStateType } from '../toggleable-based-element/toggleable-based-element'

export interface IDrawerBase {
    new (field: IFieldInput): IDrawerBase
    openState: ToggleableStateType
    setOpenState: (state: ToggleableStateType) => void
}
