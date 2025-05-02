import { FieldStateStyle } from '@core/fields/field-state-style/field-state-style'
import { IFieldInput } from '../field-input-base-types'

export const initializeStyle = function (this: IFieldInput) {
    try {
        this._style = new FieldStateStyle(this)
        this.style()?.initialize()
    } catch (e: any) {
        this.message(
            'critical',
            initializeStyle.name,
            `an error has occured when initializing ${this.name} class: ${e.message}`
        )
    }
}
