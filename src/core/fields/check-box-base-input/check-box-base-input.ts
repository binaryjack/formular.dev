import { ICheckBoxInput } from './check-box-base-input.types'
import { getValue } from './prototype/get-value'

import { handleOnChanged } from './prototype/handle-on-changed'
import { initialize } from './prototype/initialize'
import { ref } from './prototype/ref'
import { register } from './prototype/register'
import { setValue } from './prototype/set-value'

export const CheckBoxInput = function (this: ICheckBoxInput) {
    // Setup field input
} as any as ICheckBoxInput

Object.assign(CheckBoxInput.prototype, {
    initialize,
    handleOnChanged,
    ref,
    register,
    getValue,
    setValue
})
