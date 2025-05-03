import { ICheckBoxInput } from './check-box-base-input.types'

import { handleOnChanged } from './prototype/handle-on-changed'
import { initialize } from './prototype/initialize'
import { ref } from './prototype/ref'
import { register } from './prototype/register'

export const CheckBoxInput = function (this: ICheckBoxInput) {
    /** */
} as any as ICheckBoxInput

Object.assign(CheckBoxInput.prototype, {
    initialize,
    handleOnChanged,
    ref,
    register
})
