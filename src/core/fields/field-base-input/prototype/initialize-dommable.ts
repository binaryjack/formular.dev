import { Dommable } from '@core/dommable/dommable'
import { IFieldInput } from '../field-input-base-types'

export const initializeDommable = function (this: IFieldInput): IFieldInput {
    try {
        if (!this._tracker) {
            throw Error('tracker must be initialized')
        }
        this._dom = new Dommable(this._tracker)
        return this
    } catch (e: any) {
        this.message(
            'critical',
            initializeDommable.name,
            `an error has occured when initializing ${this.name} class: ${e.message}`
        )
        return this
    }
}
