import { IMaskedBaseInput } from './masked-base-input.types'
import { initialize } from './prototype/initialize'
import { onChange } from './prototype/on-change'
import { ref } from './prototype/ref'
import { register } from './prototype/register'

export const MaskedBaseInput = function (this: IMaskedBaseInput, mask: string) {
    this.isInitialized = false

    Object.defineProperty(this, 'mask', {
        value: mask,
        writable: false, // Prevent modification
        configurable: false // Prevent deletion or redefinition
    })

    Object.defineProperty(this, 'dependencyName', {
        value: MaskedBaseInput.name,
        writable: false, // Prevent modification
        configurable: false // Prevent deletion or redefinition
    })
} as any as IMaskedBaseInput

Object.assign(MaskedBaseInput.prototype, {
    initialize,
    onChange,
    ref,
    register
})
