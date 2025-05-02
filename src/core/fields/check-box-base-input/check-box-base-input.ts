import { preExceptionHandler } from '@core/tracker/pre-exception-handler/pre-exception-handler'
import { ICheckBoxInput } from './check-box-base-input.types'
import { getValue } from './prototype/get-value'

import { handleOnChanged } from './prototype/handle-on-changed'
import { initialize } from './prototype/initialize'
import { ref } from './prototype/ref'
import { register } from './prototype/register'
import { setValue } from './prototype/set-value'

export const CheckBoxInput = function (this: ICheckBoxInput) {
    this.field = function (this: ICheckBoxInput) {
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
} as any as ICheckBoxInput

Object.assign(CheckBoxInput.prototype, {
    initialize,
    handleOnChanged,
    ref,
    register,
    getValue,
    setValue
})
