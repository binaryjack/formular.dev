import { IFieldInput } from '../field-base-input/field-input-base-types'
import { IDrawerBaseInput } from './drawer-base-input.types'
import { setOpenState } from './prototype/set-open-state'

export const DrawerBaseInput = function (this: IDrawerBaseInput, field: IFieldInput) {
    // Setup field input
    this.field = field
} as any as IDrawerBaseInput

// DrawerBaseInput.prototype = {}

Object.assign(DrawerBaseInput.prototype, {
    setOpenState
})
