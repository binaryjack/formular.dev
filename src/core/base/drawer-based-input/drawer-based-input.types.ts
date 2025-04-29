import { IFieldInput } from '../field-base-input/field-input-base-types'
import { ToggleableStateType } from '../toggleable-base-element/toggleable-base-element'

export interface IDrawerBase {
    new (field: IFieldInput): IDrawerBase
    field: IFieldInput
    openState: ToggleableStateType
    setOpenState: (state: ToggleableStateType) => void
}
