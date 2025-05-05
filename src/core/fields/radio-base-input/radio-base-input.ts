import { assignToInstance } from '@core/framework/utility/assign-to-instance'
import { handleOnChanged } from './prototype/handle-on-changed'
import { initialize } from './prototype/initialize'
import { ref } from './prototype/ref'
import { refOption } from './prototype/ref-option'
import { register } from './prototype/register'
import { registerLabel } from './prototype/register-label'
import { registerOption } from './prototype/register-option'

import { IRadioBaseInput } from './radio-base-input.types'

export const RadioBaseInput = function (this: IRadioBaseInput) {
    /** */
} as any as IRadioBaseInput

export const RadioBaseInputInstance = function (prototype: object) {
    assignToInstance(prototype, {
        initialize,
        handleOnChanged,
        ref,
        register,
        refOption,
        registerOption,
        registerLabel
    })
}

RadioBaseInputInstance(RadioBaseInput.prototype)
