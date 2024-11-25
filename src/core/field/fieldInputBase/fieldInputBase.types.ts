import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

import { FieldValuesTypes, IFieldDescriptor } from '../../../dependency/common'
import { HTMLInputTypes } from '../common.types'
import { IFieldStateStyle } from '../fieldStateStyle/fieldStateStyle.types'
import { INotifiableEntity } from '../notifiableEntityBase/notifiableENtityBase.types'
import { IValueStrategy } from '../valueStrategy/valueStrategy.types'

export interface IFieldInputBase {
    new (
        id: string,
        name: string,
        type: HTMLInputTypes,
        className: string,
        defaultValue: FieldValuesTypes | null
    ): IFieldInputBase
    name: string
    originalValue: FieldValuesTypes | null
    type: string
    fieldStateStyle: IFieldStateStyle
    className: string
    valueStrategy: IValueStrategy | null
    setup: () => void
    newFromField: (field: IFieldDescriptor) => void
    classNames: () => string
    hasChanges: (callback: () => void) => void
    validate: () => void
    register: () => DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    get: () => FieldValuesTypes | null
    getAsString: () => string | null
}

export type IFieldInput = IFieldInputBase & IFieldDescriptor & INotifiableEntity
