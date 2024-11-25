import { INDate } from './dateModels'
import { DateObject } from './DateObject'
import { IFieldError, IFieldGuide } from './errors'
import { IOptionItem } from './schema/options/options.scheme.types'
import { IValidationOptions } from './validation'

export type FieldValuesTypes = string | number | INDate | DateObject | object | bigint | undefined

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
