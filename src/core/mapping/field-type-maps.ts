import { ICheckBoxBaseInput } from '@core/fields/check-box-base-input/check-box-base-input.types'
import { ISelectBaseInput } from '@core/fields/select-base-input/select-base-input.types'
import { ITextBaseInput } from '@core/fields/text-base-input/text-base-input.types'

export type FieldTypeMap = {
    text: ITextBaseInput
    checkbox: ICheckBoxBaseInput
    select: ISelectBaseInput
    // Add more field types as needed
}
