import { FieldStateStyle } from '@core/fields/field-state-style/field-state-style'
import { logManager } from '@core/general-logging-manager/log-manager'
import { IFieldBaseInput } from '../field-input-base-types'

export const useStyler = function (this: IFieldBaseInput): IFieldBaseInput {
    try {
        // if (!this.name) {
        //     throw Error('properties must be initialized')
        // }
        // if (!this?.validationStrategy) {
        //     throw Error('validationStrategy must be initialized beefore styles')
        // }
        this.styler = new FieldStateStyle()

        return this
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            useStyler.name,
            `an error has occured when initializing initializeStyle ${this.name} class: ${e.message}`
        )
        return this
    }
}
