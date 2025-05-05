import { Dommable, DommableInstance } from '@core/dommable/dommable'
import { IDommable } from '@core/dommable/dommable.types'
import { genericAccsssor } from '@core/fields/field-base-input/accessors/generic-accessor'
import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { IFieldBuilder } from '../field-builder'

export const initializeDommable = function (this: IFieldBuilder): IFieldBuilder {
    try {
        if (!this.name) {
            throw Error('properties must be initialized')
        }
        if (!this?._tracker) {
            throw Error('tracker must be initialized')
        }
        this._dom = new Dommable()
        DommableInstance(this._dom)

        this.dom = genericAccsssor<IDommable<HTMLInputElement>>('_dom')
        this?.dom()?.initialize(this?.track())
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
