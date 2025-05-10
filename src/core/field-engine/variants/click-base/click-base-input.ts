import { IClickBaseInput } from './click-base-input.types'
import { handleOnClicked } from './prototype/handle-on-clicked'
import { initialize } from './prototype/initialize'

export const ClickBaseInput = function (this: IClickBaseInput) {
    this.isInitialized = false
    this.dependencyName = ClickBaseInput.name
} as any as IClickBaseInput

Object.assign(ClickBaseInput.prototype, {
    handleOnClicked,
    initialize
})
