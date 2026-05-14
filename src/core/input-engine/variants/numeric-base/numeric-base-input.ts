import { INumericBaseInput } from './numeric-base-input.types'
import { handleOnChanged } from './prototype/handle-on-changed'
import { handleOnClear } from './prototype/handle-on-clear'
import { initialize } from './prototype/initialize'
import { ref } from './prototype/ref'
import { register } from './prototype/register'

export const NumericBaseInput = function (this: INumericBaseInput) {
    this.isInitialized = false

    Object.defineProperty(this, 'dependencyName', {
        value: NumericBaseInput.name,
        writable: false, // Prevent modification
        configurable: false // Prevent deletion or redefinition
    })
} as any as INumericBaseInput

Object.assign(NumericBaseInput.prototype, {
    initialize,
    handleOnChanged,
    handleOnClear,
    ref,
    register
})
