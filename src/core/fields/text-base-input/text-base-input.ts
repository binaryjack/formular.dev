import { preExceptionHandler } from '@core/tracker/pre-exception-handler/pre-exception-handler'
import { getValue } from './prototype/get-value'
import { handleOnChanged } from './prototype/handle-on-changed'
import { initialize } from './prototype/initialize'
import { ref } from './prototype/ref'
import { register } from './prototype/register'
import { setValue } from './prototype/set-value'
import { ITextInput } from './text-base-input.types'

export const TextBaseInput = function (this: ITextInput) {
    this.field = function (this: ITextInput) {
        if (!this._field) {
            preExceptionHandler(
                undefined,
                'critical',
                this.name,
                `Unable to instanciate ${this.name} no fieldInput was provided!`
            )
        }
        return this._field
    }
} as any as ITextInput

Object.assign(TextBaseInput.prototype, {
    initialize,
    handleOnChanged,
    ref,
    register,
    getValue,
    setValue
})
