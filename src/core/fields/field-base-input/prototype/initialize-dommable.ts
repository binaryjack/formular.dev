import { Dommable } from '@core/dommable/dommable'
import { IFieldInput } from '../field-input-base-types'

export const initializeDommable = function (this: IFieldInput) {
    if (!this._tracker) {
        throw Error(
            `${this.name} ${initializeDommable.name} needs to have field's traker preinitialized!`
        )
    }
    if (!this.prototype) {
        this.message(
            'critical',
            initializeDommable.name,
            `the prototype of ${this.name} is not yes defined`
        )
        return
    }
    try {
        this._dom = new Dommable(this._tracker)
    } catch (e: any) {
        this.message(
            'critical',
            initializeDommable.name,
            `an error has occured when initializing ${this.name} class: ${e.message}`
        )
    }
}
