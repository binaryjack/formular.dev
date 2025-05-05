import { FieldStateStyle } from '@core/fields/field-state-style/field-state-style'
import { IFieldBaseInput } from '../field-input-base-types'

export const initializeStyle = function (this: IFieldBaseInput) {
    try {
        this._style = new FieldStateStyle()
        this.style()?.initialize(this)
    } catch (e: any) {
        this.message(
            'critical',
            initializeStyle.name,
            `an error has occured when initializing ${this.name} class: ${e.message}`
        )
    }
}
