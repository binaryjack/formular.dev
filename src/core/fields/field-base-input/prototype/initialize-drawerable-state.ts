import { DrawerBaseInput } from '@core/fields/drawer-base-input/drawer-base-input'
import { IFieldInput } from '../field-input-base-types'

export const initializeDrawerableState = function (this: IFieldInput) {
    if (!this._tracker) {
        throw Error(
            `${this.name} ${initializeDrawerableState.name} needs to have field's traker preinitialized!`
        )
    }
    if (!this.prototype) {
        this.message(
            'critical',
            initializeDrawerableState.name,
            `the prototype of ${this.name} is not yes defined`
        )
        return
    }
    try {
        this._drawer = new DrawerBaseInput()
    } catch (e: any) {
        this.message(
            'critical',
            initializeDrawerableState.name,
            `an error has occured when initializing ${this.name} class: ${e.message}`
        )
    }
}
