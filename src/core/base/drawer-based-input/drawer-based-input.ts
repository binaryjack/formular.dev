import { ToggleableStateType } from '../toggleable-based-element/toggleable-based-element'

export interface IDrawerBase {
    openState: ToggleableStateType
    setOpenState: (state: ToggleableStateType) => void
}
