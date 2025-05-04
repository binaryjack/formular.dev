import { IDrawerBaseInput } from './drawer-base-input.types'
import { initialize } from './prototype/initialize'
import { setOpenState } from './prototype/set-open-state'

export const DrawerBaseInput = function (this: IDrawerBaseInput) {
    /** */
} as any as IDrawerBaseInput

Object.assign(DrawerBaseInput.prototype, {
    initialize,
    setOpenState
})
