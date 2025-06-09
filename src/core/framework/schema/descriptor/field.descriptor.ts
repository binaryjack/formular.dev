import { InputTypeNames } from '@core/framework/common/common.input.types'

import { InputDataTypes } from '@core/framework/common/common.input.data.types'
import { IFieldError } from '@core/framework/models/errors/i-field-error'
import { IFieldGuide } from '@core/framework/models/errors/i-field-guide'
import { IValidationOptions } from '@core/managers/validation-manager/validation-manager.types'
import { IOptionItem } from '../options-schema/options.scheme.types'
import { INDate } from './i-n-date'

export const SFieldDescriptor = Symbol.for('IFieldDescriptor')

export interface IFieldDescriptor {
    id: number
    name: string
    label: string
    value: InputDataTypes
    objectValue: INDate | null
    defaultValue: InputDataTypes
    type: InputTypeNames
    errors: IFieldError[]
    guides: IFieldGuide[]
    validationOptions: IValidationOptions
    target?: string
    options: IOptionItem[]
    isValid: boolean
    isDirty: boolean
    isPristine: boolean
    isFocus: boolean
    expectedValue?: InputDataTypes
    loaded?: boolean
    changed?: boolean
    // defined in backend : describes if the field should be validated
    shouldValidate: boolean
    // defines the mask for the field you must use # as numeric placeholder
    // example: date ##/##/#### => 12/12/2023
    mask?: string
}

export type TFieldDescriptor = {
    [key in keyof IFieldDescriptor]: string
}
