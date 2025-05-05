import { assignToInstance } from '@core/framework/utility/assign-to-instance'
import { IDrawerBaseInput } from './drawer-base-input.types'
import { initialize } from './prototype/initialize'
import { setOpenState } from './prototype/set-open-state'

export const DrawerBaseInput = function (this: IDrawerBaseInput) {
    /** */
} as any as IDrawerBaseInput

export const DrawerBaseInputInstance = function (prototype: object) {
    assignToInstance(prototype, {
        initialize,
        setOpenState
    })
}

DrawerBaseInputInstance(DrawerBaseInput.prototype)
