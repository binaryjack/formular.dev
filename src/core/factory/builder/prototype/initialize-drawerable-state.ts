import {
    DrawerBaseInput,
    DrawerBaseInputInstance
} from '@core/fields/drawer-base-input/drawer-base-input'
import { IDrawerBaseInput } from '@core/fields/drawer-base-input/drawer-base-input.types'
import { genericAccsssor } from '@core/fields/field-base-input/accessors/generic-accessor'
import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { IFieldBuilder } from '../field-builder'

export const initializeDrawerableState = function (this: IFieldBuilder): IFieldBuilder {
    try {
        if (!this.name) {
            throw Error('properties must be initialized')
        }
        if (!this?._tracker) {
            throw Error('tracker must be initialized')
        }
        this._drawer = new DrawerBaseInput()
        DrawerBaseInputInstance(this._drawer)

        this.drawer = genericAccsssor<IDrawerBaseInput>('_drawer')
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
