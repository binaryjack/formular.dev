import { IOptionBaseInput } from '../option-base-input.types'

export const getSelectedValue = function (this: IOptionBaseInput) {
    const value = this?.selectedOptionId
        ? this?.getOptionBySequenceId(this?.selectedOptionId)?.text
        : ''

    return value
}
