import { ICheckBoxBaseInput } from './check-box-base-input.types'

import { initialize } from './prototype/initialize'
import { ref } from './prototype/ref'
import { register } from './prototype/register'

export const CheckBoxInput = function (this: ICheckBoxBaseInput) {
    this.isInitialized = false

    Object.defineProperty(this, 'dependencyName', {
        value: CheckBoxInput.name,
        writable: false, // Prevent modification
        configurable: false // Prevent deletion or redefinition
    })

    this.checked = false
} as any as ICheckBoxBaseInput

Object.assign(CheckBoxInput.prototype, {
    initialize,
    register,
    ref
})
