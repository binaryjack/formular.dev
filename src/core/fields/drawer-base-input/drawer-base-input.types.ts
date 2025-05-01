import { IFieldInput } from '../field-base-input/field-input-base-types'
import { ToggleableStateType } from '../toggleable-base-element/toggleable-base-element'

export type IDrawerInput = IDrawerBaseInput & IFieldInput

export interface IDrawerBaseInput {
    new (): IDrawerBaseInput
    openState: ToggleableStateType
    setOpenState: (state: ToggleableStateType) => void
}
