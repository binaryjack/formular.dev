import { assignToInstance } from '@core/framework/utility/assign-to-instance'
import { handleOnChanged } from './prototype/handle-on-changed'
import { initialize } from './prototype/initialize'
import { ref } from './prototype/ref'
import { register } from './prototype/register'
import { ITextBaseInput } from './text-base-input.types'

export const TextBaseInput = function (this: ITextBaseInput) {
    /** */
} as any as ITextBaseInput

export const TextBaseInputInstance = function (prototype: object) {
    assignToInstance(prototype, { initialize, handleOnChanged, ref, register })
}

TextBaseInputInstance(TextBaseInput.prototype)
