import { IClickBaseInput } from './click-base-input.types'
import { handleOnClicked } from './prototype/handle-on-clicked'
import { initialize } from './prototype/initialize'

export const ClickBaseInput = function (this: IClickBaseInput) {
    /** */
} as any as IClickBaseInput

Object.assign(ClickBaseInput.prototype, {
    handleOnClicked,
    initialize
})
