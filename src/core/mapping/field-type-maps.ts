import { ICheckBoxBaseInput } from '@core/fields/check-box-base-input/check-box-base-input.types'
import { IRadioBaseInput } from '@core/fields/radio-base-input/radio-base-input.types'
import { ISelectBaseInput } from '@core/fields/select-base-input/select-base-input.types'
import { ITextBaseInput } from '@core/fields/text-base-input/text-base-input.types'

export type FieldTypeMap = {
    text: ITextBaseInput
    richtext: ITextBaseInput
    number: ITextBaseInput
    range: ITextBaseInput
    tel: ITextBaseInput
    email: ITextBaseInput
    url: ITextBaseInput
    password: ITextBaseInput
    date: ITextBaseInput
    time: ITextBaseInput
    radio: IRadioBaseInput
    select: ISelectBaseInput
    checkbox: ICheckBoxBaseInput
    toggle: ICheckBoxBaseInput

    // Add more field types as needed
}
