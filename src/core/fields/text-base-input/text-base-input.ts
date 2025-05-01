import { getValue } from './prototype/get-value'
import { handleOnChanged } from './prototype/handle-on-changed'
import { initialize } from './prototype/initialize'
import { ref } from './prototype/ref'
import { register } from './prototype/register'
import { setValue } from './prototype/set-value'
import { ITextBaseInput, ITextInput } from './text-base-input.types'

export const TextBaseInput = function (this: ITextInput) {
    // Setup field input
} as any as ITextBaseInput

Object.assign(TextBaseInput.prototype, {
    initialize,
    handleOnChanged,
    ref,
    register,
    getValue,
    setValue
})
