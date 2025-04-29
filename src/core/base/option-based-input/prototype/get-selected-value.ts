import { IOptionBaseInput } from '../option-based-input'

export const getSelectedValue = function (this: IOptionBaseInput) {
    const value = this?.selectedOptionId
        ? this?.getOptionBySequenceId(this?.selectedOptionId)?.text
        : ''

    return value
}
