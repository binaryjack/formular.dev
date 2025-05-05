import { assignToInstance } from '@core/framework/utility/assign-to-instance'
import { IClickBaseInput } from './click-base-input.types'
import { handleOnClicked } from './prototype/handle-on-clicked'
import { initialize } from './prototype/initialize'

export const ClickBaseInput = function (this: IClickBaseInput) {
    /** */
} as any as IClickBaseInput

export const ClickBaseInputInstance = function (prototype: object) {
    assignToInstance(prototype, {
        handleOnClicked,
        initialize
    })
}

ClickBaseInputInstance(ClickBaseInput.prototype)
