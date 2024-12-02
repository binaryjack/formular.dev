import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

import { FieldValuesTypes } from '../../../dependency/schema/descriptor/field.data.types'
import { IFieldDescriptor } from '../../../dependency/schema/descriptor/field.descriptor'
import { IEntityScheme } from '../../../dependency/schema/fieldSchema/field.schema.types'
import { IFieldStateStyle } from '../fieldStateStyle/fieldStateStyle.types'
import { INotifiableEntity } from '../notifiableEntity/notifiableEntityBase.types'
import { IValidationResult, IValidator } from '../validation/validator.types'
import { IValueStrategy } from '../valueStrategy/valueStrategy.types'

export type SchemeToDescriptorConverterType = (scheme: IEntityScheme) => IFieldDescriptor

export type IFieldInput = IFieldInputBase & IFieldDescriptor & INotifiableEntity

export interface IFieldInputBase {
    new (descriptor: IFieldDescriptor): IFieldInput
    name: string
    originalValue: FieldValuesTypes | null
    type: string
    fieldStateStyle: IFieldStateStyle
    className: string
    valueStrategy: IValueStrategy | null
    setup: () => void
    classNames: () => string
    hasChanges: (callback: () => void) => void
    validate: (vtor: IValidator) => IValidationResult[]
    register: () => DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    get: () => FieldValuesTypes | null
    getAsString: () => string | null
}
