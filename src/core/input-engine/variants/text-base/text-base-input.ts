import { handleOnChanged } from './prototype/handle-on-changed'
import { handleOnClear } from './prototype/handle-on-clear'
import { initialize } from './prototype/initialize'
import { ref } from './prototype/ref'
import { register } from './prototype/register'
import { ITextBaseInput } from './text-base-input.types'

export const TextBaseInput = function (this: ITextBaseInput) {
    this.isInitialized = false

    Object.defineProperty(this, 'dependencyName', {
        value: TextBaseInput.name,
        writable: false, // Prevent modification
        configurable: false // Prevent deletion or redefinition
    })
} as any as ITextBaseInput

Object.assign(TextBaseInput.prototype, {
    initialize,
    handleOnChanged,
    handleOnClear,
    ref,
    register
})
