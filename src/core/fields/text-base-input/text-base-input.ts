import { handleOnChanged } from './prototype/handle-on-changed'
import { initialize } from './prototype/initialize'
import { ref } from './prototype/ref'
import { register } from './prototype/register'
import { ITextBaseInput } from './text-base-input.types'

export const TextBaseInput = function (this: ITextBaseInput) {
    /** */
} as any as ITextBaseInput

Object.assign(TextBaseInput.prototype, {
    initialize,
    handleOnChanged,
    ref,
    register
})
