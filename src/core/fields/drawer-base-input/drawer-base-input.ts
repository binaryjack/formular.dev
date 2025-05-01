import { IDrawerBaseInput, IDrawerInput } from './drawer-base-input.types'
import { setOpenState } from './prototype/set-open-state'

export const DrawerBaseInput = function (this: IDrawerInput) {} as any as IDrawerBaseInput

Object.assign(DrawerBaseInput.prototype, {
    setOpenState
})
