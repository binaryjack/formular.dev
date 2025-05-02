import { preExceptionHandler } from '@core/tracker/pre-exception-handler/pre-exception-handler'
import { IOptionBaseInput } from './option-base-input.types'
import { checkOptionsInitialized } from './prototype/check-options-initialized'
import { getOptionById } from './prototype/get-option-by-id'
import { getOptionBySequenceId } from './prototype/get-option-by-sequence-id'
import { getOptionByValue } from './prototype/get-option-by-value'
import { getSelectedValue } from './prototype/get-selected-value'
import { initialize } from './prototype/initialize'
import { tryGetOptionByIdOrValue } from './prototype/try-get-option-by-id-or-value'
import { tryGetOptionBySequenceIdThenIdOrValue } from './prototype/try-get-option-by-sequence-id-then-id-or-value'

export const OptionBaseInput = function (this: IOptionBaseInput) {
    /** works with IOptionItem[] and fields of type select*/

    this.field = function (this: IOptionBaseInput) {
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
} as any as IOptionBaseInput

Object.assign(OptionBaseInput.prototype, {
    initialize,
    checkOptionsInitialized,
    getSelectedValue,
    getOptionByValue,
    getOptionById,
    getOptionBySequenceId,
    tryGetOptionByIdOrValue,
    tryGetOptionBySequenceIdThenIdOrValue
})
