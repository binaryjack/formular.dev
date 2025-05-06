import { Dommable } from '@core/dommable/dommable'
import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { IFieldBaseInput } from '../field-input-base-types'

export const initializeDommable = function (this: IFieldBaseInput): IFieldBaseInput {
    try {
        if (!this.name) {
            throw Error('properties must be initialized')
        }
        if (!this?.tracker) {
            throw Error('tracker must be initialized')
        }
        this.dom = new Dommable()
        this?.dom?.initialize(this?.tracker)
        return this
    } catch (e: any) {
        generalExceptionHandler(
            undefined,
            'critical',
            initializeDommable.name,
            `an error has occured when initializing initializeDommable ${this.name} class: ${e.message}`
        )
        return this
    }
}
