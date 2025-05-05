import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { IFieldBaseInput } from '../field-input-base-types'

export const checkInitialized = function (this: IFieldBaseInput): boolean {
    try {
        if (!this) {
            throw Error('_baseInput must be initialized')
        }
        if (!this._tracker || !this.track()) {
            throw Error('tracker must be initialized')
        }
        if (!this._notifier || !this.notifier()) {
            throw Error('notifier must be initialized')
        }
        if (!this._dom || !this.dom()) {
            throw Error('dom must be initialized')
        }
        if (!this._style || !this.style()) {
            throw Error('style must be initialized')
        }
        if (!this._validation || !this.validationStrategy()) {
            throw Error('validation strategy must be initialized')
        }
        if (!this._value || !this.valueStrategy()) {
            throw Error('value strategy must be initialized')
        }
        if (this.validationStrategy()?.validationStrategies?.length === 0) {
            generalExceptionHandler(
                undefined,
                'warning',
                checkInitialized.name,
                `validation strategy needs at least one strategy in order to make it's work.
                Solution:
                - add a validation stategy
                `
            )
        }
        if (this.valueStrategy()?.valueStrategies?.length === 0) {
            generalExceptionHandler(
                undefined,
                'error',
                checkInitialized.name,
                `value strategy needs at least one strategy in order to persist and get data back.
                Solution:
                - add a value stategy
                `
            )
        }
        return true
    } catch (e: any) {
        generalExceptionHandler(
            undefined,
            'critical',
            checkInitialized.name,
            `an error has occured when initializing ${this.name} class: ${e.message}`
        )
        return false
    }
}
