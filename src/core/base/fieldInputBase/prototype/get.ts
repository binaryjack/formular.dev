import { FieldValuesTypes } from '../../../../dependency/schema/descriptor/field.data.types'
import { IFieldInput } from '../fieldInput.types'

export const get = function (this: IFieldInput) {
    return this.valueStrategy?.getValue(this) as FieldValuesTypes | null
    /** Let this comments below in order to debug when needed */
    // const output = this.valueStrategy?.getValue(this) as FieldValuesTypes | null
    // console.log(output)
    // return output
}
