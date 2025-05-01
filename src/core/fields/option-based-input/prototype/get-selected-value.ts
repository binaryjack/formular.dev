import { IOptionInput } from '../option-base-input.types'

export const getSelectedValue = function (this: IOptionInput) {
    const value = this?.selectedOptionId
        ? this?.getOptionBySequenceId(this?.selectedOptionId)?.text
        : ''

    return value
}
