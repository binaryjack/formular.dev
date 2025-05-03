import { IClickInput } from './click-base-input.types'
import { handleOnClicked } from './prototype/handle-on-clicked'
import { initialize } from './prototype/initialize'

export const ClickBaseInput = function (this: IClickInput) {
    /** */
} as any as IClickInput

Object.assign(ClickBaseInput.prototype, {
    handleOnClicked,
    initialize
})
