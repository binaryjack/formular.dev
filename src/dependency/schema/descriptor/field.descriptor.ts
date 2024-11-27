import { IFieldError, IFieldGuide } from '../../errors'
import { IValidationOptions } from '../../validation'
import { IOptionItem } from '../optionsSchema/options.scheme.types'
import { INDate } from './field.data.date.struct'
import { FieldValuesTypes } from './field.data.types'

export interface IFieldDescriptor {
    id: number
    name: string
    label: string
    value: Omit<FieldValuesTypes, 'object' | 'INDate' | 'DateObject'> | null
    objectValue: INDate | null
    defaultValue: Omit<FieldValuesTypes, 'object' | 'INDate' | 'DateObject'> | null
    type: string
    errors: IFieldError[]
    guides: IFieldGuide[]
    validationOptions: IValidationOptions
    target?: string
    options: IOptionItem[]
    isValid: boolean
    isDirty: boolean
    isPristine: boolean
    isFocus: boolean
    expectedValue?: FieldValuesTypes
    loaded?: boolean
    changed?: boolean
    // defined in backend : describes if the field should be validated
    shouldValidate: boolean
}

export type TFieldDescriptor = {
    [key in keyof IFieldDescriptor]: string
}
