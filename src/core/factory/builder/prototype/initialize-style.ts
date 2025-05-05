import { genericAccsssor } from '@core/fields/field-base-input/accessors/generic-accessor'
import {
    FieldStateStyle,
    FieldStateStyleInstance
} from '@core/fields/field-state-style/field-state-style'
import { IFieldStateStyle } from '@core/fields/field-state-style/field-state-style.types'
import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { IFieldBuilder } from '../field-builder'

export const initializeStyle = function (this: IFieldBuilder): IFieldBuilder {
    try {
        if (!this.name) {
            throw Error('properties must be initialized')
        }
        if (!this?._validation) {
            throw Error('_validation must be initialized beefore styles')
        }
        this._style = new FieldStateStyle()
        FieldStateStyleInstance(this._style)

        this.style = genericAccsssor<IFieldStateStyle>('_style')
        this.style()?.initialize(this)
        return this
    } catch (e: any) {
        generalExceptionHandler(
            undefined,
            'critical',
            initializeStyle.name,
            `an error has occured when initializing initializeDommable ${this.name} class: ${e.message}`
        )
        return this
    }
}
