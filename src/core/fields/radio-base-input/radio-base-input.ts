import { handleOnChanged } from './prototype/handle-on-changed'
import { initialize } from './prototype/initialize'
import { ref } from './prototype/ref'
import { refOption } from './prototype/ref-option'
import { register } from './prototype/register'
import { registerLabel } from './prototype/register-label'
import { registerOption } from './prototype/register-option'

import { IRadioInput } from './radio-base-input.types'

export const RadioInput = function (this: IRadioInput) {
    /** */
} as any as IRadioInput

Object.assign(RadioInput.prototype, {
    initialize,
    handleOnChanged,
    ref,
    register,
    refOption,
    registerOption,
    registerLabel
})
