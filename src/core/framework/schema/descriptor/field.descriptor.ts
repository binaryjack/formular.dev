import { FieldTypeNames } from '@core/framework/common/common.field.types'

import { FieldDataTypes } from '@core/framework/common/common.field.data.types'
import { IFieldError } from '@core/framework/models/errors/i-field-error'
import { IFieldGuide } from '@core/framework/models/errors/i-field-guide'
import { IValidationOptions } from '@core/managers/validation-manager/validation-manager.types'
import { IOptionItem } from '../options-schema/options.scheme.types'
import { INDate } from './i-n-date'

export interface IFieldDescriptor {
    id: number
    name: string
    label: string
    value: FieldDataTypes
    objectValue: INDate | null
    defaultValue: FieldDataTypes
    type: FieldTypeNames
    errors: IFieldError[]
    guides: IFieldGuide[]
    validationOptions: IValidationOptions
    target?: string
    options: IOptionItem[]
    isValid: boolean
    isDirty: boolean
    isPristine: boolean
    isFocus: boolean
    expectedValue?: FieldDataTypes
    loaded?: boolean
    changed?: boolean
    // defined in backend : describes if the field should be validated
    shouldValidate: boolean
}

export type TFieldDescriptor = {
    [key in keyof IFieldDescriptor]: string
}
