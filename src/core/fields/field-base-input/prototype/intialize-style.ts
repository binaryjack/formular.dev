import { FieldStateStyle } from '@core/fields/field-state-style/field-state-style'
import { IFieldInput } from '../field-input-base-types'

export const initializeStyle = function (this: IFieldInput) {
    try {
        this._style = new FieldStateStyle(this)
        this._style.initialize()
    } catch (e: any) {
        console.error(initializeStyle.name, e.message)
    }
}
