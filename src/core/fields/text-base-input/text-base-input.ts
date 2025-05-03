import { handleOnChanged } from './prototype/handle-on-changed'
import { initialize } from './prototype/initialize'
import { ref } from './prototype/ref'
import { register } from './prototype/register'
import { ITextInput } from './text-base-input.types'

export const TextBaseInput = function (this: ITextInput) {
    /** */
} as any as ITextInput

Object.assign(TextBaseInput.prototype, {
    initialize,
    handleOnChanged,
    ref,
    register
})
