import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

import { FieldValuesTypes, IFieldDescriptor } from '../../../dependency/common'
import { IEntityScheme } from '../../../dependency/schema/field/field.scheme.types'
import { IFieldStateStyle } from '../fieldStateStyle/fieldStateStyle.types'
import { INotifiableEntity } from '../notifiableEntityBase/notifiableENtityBase.types'
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
    validate: () => void
    register: () => DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    get: () => FieldValuesTypes | null
    getAsString: () => string | null
}
