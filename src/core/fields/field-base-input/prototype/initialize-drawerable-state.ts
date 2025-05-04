import { DrawerBaseInput } from '@core/fields/drawer-base-input/drawer-base-input'
import { IFieldInput } from '../field-input-base-types'

export const initializeDrawerableState = function (this: IFieldInput) {
    try {
        if (!this._tracker) {
            throw Error('tracker must be initialized')
        }
        this._drawer = new DrawerBaseInput()
        return this
    } catch (e: any) {
        this.message(
            'critical',
            initializeDrawerableState.name,
            `an error has occured when initializing ${this.name} class: ${e.message}`
        )
        return this
    }
}
