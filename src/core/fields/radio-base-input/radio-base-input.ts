import { getValue } from './prototype/get-value'
import { handleOnChanged } from './prototype/handle-on-changed'
import { initialize } from './prototype/initialize'
import { ref } from './prototype/ref'
import { register } from './prototype/register'
import { setValue } from './prototype/set-value'
import { IRadioInput } from './radio-base-input.types'

export const RadioInput = function (this: IRadioInput) {
    // Setup field input
} as any as IRadioInput

Object.assign(RadioInput.prototype, {
    initialize,
    handleOnChanged,
    ref,
    register,
    getValue,
    setValue
})
