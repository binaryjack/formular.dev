import { logManager } from '@core/general-logging-manager/log-manager'
import { IFieldBaseInput } from '../field-input-base-types'

export interface IInitilizationCheckResult {
    success: boolean
    errors: string[]
}

export const defaultPrecheck: IInitilizationCheckResult = { success: true, errors: [] }

export const checkInitialized = function (this: IFieldBaseInput): IInitilizationCheckResult {
    const output: string[] = []
    try {
        if (!this) {
            output.push('_baseInput must be initialized')
        }
        if (!this.tracker) {
            output.push('tracker must be initialized')
        }
        if (!this.notifier) {
            output.push('notifier must be initialized')
        }
        if (!this.dom) {
            output.push('dom must be initialized')
        }
        if (!this.styler) {
            output.push('style must be initialized')
        }
        if (!this.validationStrategy) {
            output.push('validation strategy must be initialized')
        }
        if (!this.valueStrategy) {
            output.push('value strategy must be initialized')
        }
        if (this.validationStrategy?.validationStrategies?.length === 0) {
            output.push(
                `validation strategy needs at least one strategy in order to make it's work.
                Solution:
                - add a validation stategy
                `
            )
        }
        if (this.valueStrategy?.valueStrategies?.length === 0) {
            output.push(
                `value strategy needs at least one strategy in order to persist and get data back.
                Solution:
                - add a value stategy
                `
            )
        }
        return { success: output.length === 0, errors: output }
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            checkInitialized.name,
            `A Criticla error has occured when initializing ${this.name} class: ${e.message}`
        )
        return { success: output.length === 0, errors: output }
    }
}
