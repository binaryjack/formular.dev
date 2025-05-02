import { preExceptionHandler } from '@core/tracker/pre-exception-handler/pre-exception-handler'
import { IDropDownBaseInput } from './drop-down-base-input.types'
import { getValue } from './prototype/get-value'

import { handleOnChanged } from './prototype/handle-on-changed'
import { handleOnSelected } from './prototype/handle-on-selected'
import { initialize } from './prototype/initialize'
import { onSelectItem } from './prototype/on-select-item'
import { ref } from './prototype/ref'
import { refOption } from './prototype/ref-option'
import { register } from './prototype/register'
import { registerOption } from './prototype/register-option'
import { setValue } from './prototype/set-value'

export const DropDownBaseInput = function (this: IDropDownBaseInput) {
    this.field = function (this: IDropDownBaseInput) {
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
} as any as IDropDownBaseInput

Object.assign(DropDownBaseInput.prototype, {
    initialize,
    handleOnChanged,
    handleOnSelected,
    ref,
    register,
    refOption,
    registerOption,
    onSelectItem,
    getValue,
    setValue
})
