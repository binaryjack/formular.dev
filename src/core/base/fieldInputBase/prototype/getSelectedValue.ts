import { IFieldInput } from '../fieldInput.types'

export const getSelectedValue = function (this: IFieldInput) {
    return this?.selectedOptionId
        ? this?.getOptionById(this?.selectedOptionId.toString())?.text
        : ''
}
