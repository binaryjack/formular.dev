import { Dommable } from '@core/dommable/dommable'
import { IFieldInput } from '../field-input-base-types'

export const initializeDommable = function (this: IFieldInput) {
    if (!this.prototype) {
        throw Error(`${initializeDommable.name}: the prototype of ${this.name} is not yes defined`)
    }
    try {
        this.prototype = { ...this.prototype, ...Dommable.prototype }
        Dommable.call(this)
    } catch (e: any) {
        console.error(initializeDommable.name, e.message)
    }
}
