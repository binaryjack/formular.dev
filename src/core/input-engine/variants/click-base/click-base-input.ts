import { IClickBaseInput } from './click-base-input.types'
import { initialize } from './prototype/initialize'
import { onClickHandle } from './prototype/on-click-handle'

export const ClickBaseInput = function (this: IClickBaseInput) {
    this.isInitialized = false

    Object.defineProperty(this, 'dependencyName', {
        value: ClickBaseInput.name,
        writable: false, // Prevent modification
        configurable: false // Prevent deletion or redefinition
    })
} as any as IClickBaseInput

Object.assign(ClickBaseInput.prototype, {
    initialize,
    onClickHandle
})
