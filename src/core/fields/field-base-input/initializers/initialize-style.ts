import { FieldStateStyle } from '@core/fields/field-state-style/field-state-style'
import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { Constructor } from '../constructors/constructors'
import { IFieldBaseInput } from '../field-input-base-types'

export const initializeStyle = function (this: IFieldBaseInput): IFieldBaseInput {
    try {
        if (!this.name) {
            throw Error('properties must be initialized')
        }
        if (!this?.validationStrategy) {
            throw Error('validationStrategy must be initialized beefore styles')
        }
        this.styler = new FieldStateStyle(new Constructor(undefined, this))

        this.styler.update(
            'required',
            this.validationStrategy?.validationOptions.requiredData?.required === true
        )
        return this
    } catch (e: any) {
        generalExceptionHandler(
            undefined,
            'critical',
            initializeStyle.name,
            `an error has occured when initializing initializeStyle ${this.name} class: ${e.message}`
        )
        return this
    }
}
