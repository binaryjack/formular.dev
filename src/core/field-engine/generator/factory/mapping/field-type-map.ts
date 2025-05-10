import { ICheckBoxBaseInput } from '@core/field-engine/variants/check-box-base/check-box-base-input.types'
import { IRadioBaseInput } from '@core/field-engine/variants/radio-base/radio-base-input.types'
import { ISelectBaseInput } from '@core/field-engine/variants/select-base/select-base-input.types'
import { ITextBaseInput } from '@core/field-engine/variants/text-base/text-base-input.types'

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
