import { handleOnChanged } from './prototype/handle-on-changed'
import { handleOnClear } from './prototype/handle-on-clear'
import { initialize } from './prototype/initialize'
import { ref } from './prototype/ref'
import { register } from './prototype/register'
import { ITextBaseInput } from './text-base-input.types'

export const TextBaseInput = function (this: ITextBaseInput) {
    this.isInitialized = false
    this.dependencyName = TextBaseInput.name
} as any as ITextBaseInput

Object.assign(TextBaseInput.prototype, {
    initialize,
    handleOnChanged,
    handleOnClear,
    ref,
    register
})
