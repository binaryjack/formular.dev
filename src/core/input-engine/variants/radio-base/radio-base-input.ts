import { handleOnChanged } from './prototype/handle-on-changed'
import { initialize } from './prototype/initialize'
import { ref } from './prototype/ref'
import { refOption } from './prototype/ref-option'
import { register } from './prototype/register'
import { registerLabel } from './prototype/register-label'
import { registerOption } from './prototype/register-option'

import { IRadioBaseInput } from './radio-base-input.types'
export const RadioBaseInput = function (this: IRadioBaseInput) {
    this.isInitialized = false

    Object.defineProperty(this, 'dependencyName', {
        value: RadioBaseInput.name,
        writable: false, // Prevent modification
        configurable: false // Prevent deletion or redefinition
    })
} as any as IRadioBaseInput

Object.assign(RadioBaseInput.prototype, {
    initialize,
    handleOnChanged,
    ref,
    register,
    refOption,
    registerOption,
    registerLabel
})
