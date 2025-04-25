import { IFieldInput } from '../field-input.types'

export const getSelectedValue = function (this: IFieldInput) {
    const value = this?.selectedOptionId
        ? this?.getOptionBySequenceId(this?.selectedOptionId)?.text
        : ''

    return value
}
