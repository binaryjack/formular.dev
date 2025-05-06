import { DrawerBaseInput } from '@core/fields/drawer-base-input/drawer-base-input'
import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { Constructor } from '../constructors/constructors'
import { IFieldBaseInput } from '../field-input-base-types'

export const initializeDrawerableState = function (this: IFieldBaseInput): IFieldBaseInput {
    try {
        if (!this.name) {
            throw Error('properties must be initialized')
        }
        if (!this?.tracker) {
            throw Error('tracker must be initialized')
        }
        this.drawer = new DrawerBaseInput(new Constructor(undefined, this))
        return this
    } catch (e: any) {
        generalExceptionHandler(
            undefined,
            'critical',
            initializeDrawerableState.name,
            `an error has occured when initializing initializeDommable ${this.name} class: ${e.message}`
        )
        return this
    }
}
