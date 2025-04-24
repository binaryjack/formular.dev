import { IFieldInput } from '../field-input.types'

export const getSelectedValue = function (this: IFieldInput) {
    const value = this?.selectedOptionId
        ? this?.getOptionById(this?.selectedOptionId.toString())?.text
        : ''

    return value
}
