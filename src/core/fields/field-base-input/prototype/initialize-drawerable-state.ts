import { DrawerBaseInput } from '@core/fields/drawer-base-input/drawer-base-input'
import { IFieldInput } from '../field-input-base-types'
import { initializeDommable } from './initialize-dommable'

export const initializeDrawerableState = function (this: IFieldInput) {
    if (!this.prototype) {
        throw Error(`${initializeDommable.name}: the prototype of ${this.name} is not yes defined`)
    }
    try {
        this._drawerable = new DrawerBaseInput()
    } catch (e: any) {
        console.error(initializeDommable.name, e.message)
    }
}
