import { FieldTypesNamesEnum } from '@core/common.types'
import { IValidationOptions } from '@core/validation-strategy/validation-strategy.types'
import { IFieldError, IFieldGuide } from '../../errors'
import { IOptionItem } from '../options-schema/options.scheme.types'
import { INDate } from './field.data.date.struct'
import { IFValueTypes } from './field.data.types'

export interface IFieldDescriptor {
    id: number
    name: string
    label: string
    value: IFValueTypes
    objectValue: INDate | null
    defaultValue: IFValueTypes
    type: FieldTypesNamesEnum
    errors: IFieldError[]
    guides: IFieldGuide[]
    validationOptions: IValidationOptions
    target?: string
    options: IOptionItem[]
    isValid: boolean
    isDirty: boolean
    isPristine: boolean
    isFocus: boolean
    expectedValue?: IFValueTypes
    loaded?: boolean
    changed?: boolean
    // defined in backend : describes if the field should be validated
    shouldValidate: boolean
}

export type TFieldDescriptor = {
    [key in keyof IFieldDescriptor]: string
}
