import { IFieldInputExtended } from '../field-base-input/field-input-base-types'
import { ToggleableStateType } from '../toggleable-base-element/toggleable-base-element'

export interface IDrawerBaseInput extends IFieldInputExtended {
    new (): IDrawerBaseInput
    openState: ToggleableStateType
    setOpenState: (state: ToggleableStateType) => void
    initialize: (fieldInput: IFieldInputExtended) => void
}
