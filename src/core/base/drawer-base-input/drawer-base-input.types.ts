import { IFieldInput } from '../field-base-input/field-input-base-types'
import { ToggleableStateType } from '../toggleable-base-element/toggleable-base-element'

export interface IDrawerBaseInput {
    new (field: IFieldInput): IDrawerBaseInput
    field: IFieldInput
    openState: ToggleableStateType
    setOpenState: (state: ToggleableStateType) => void
}
