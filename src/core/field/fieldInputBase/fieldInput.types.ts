import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

import { FieldValuesTypes } from '../../../dependency/schema/descriptor/field.data.types'
import { IFieldDescriptor } from '../../../dependency/schema/descriptor/field.descriptor'
import { IEntityScheme } from '../../../dependency/schema/fieldSchema/field.schema.types'
import { INotifiableEntity } from '../../notifiableEntity/notifiableEntityBase.types'
import { IDrawerBase } from '../components/drawer/Drawer.types'
import { IFieldStateStyle, IFlagsObject } from '../fieldStateStyle/fieldStateStyle.types'
import { IValidable, IValidableField } from '../validation/validator.types'
import { IValueStrategy } from '../valueStrategy/valueStrategy.types'

export type SchemeToDescriptorConverterType = (scheme: IEntityScheme) => IFieldDescriptor

export type IFieldInput = IFieldInputBase &
    IFieldDescriptor &
    INotifiableEntity &
    IDrawerBase &
    IValidable &
    IValidableField

export interface IFieldInputBase {
    new (descriptor: IFieldDescriptor): IFieldInput
    name: string
    internalHTMLElementRef: React.RefObject<HTMLInputElement> | null
    internalHTMLElementRefs: React.RefObject<HTMLInputElement>[]
    originalValue: FieldValuesTypes | null
    enabled: boolean
    type: string
    fieldStateStyle: IFieldStateStyle
    className: string
    valueStrategy: IValueStrategy | null
    checked?: boolean
    setup: () => void
    classNames: () => string
    getFlagsObject: () => IFlagsObject
    hasChanges: (callback: () => void) => void
    setFocus: () => void
    enable: (enabled: boolean) => void
    show: (show: boolean) => void
    clear: () => void
    register: () => DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    registerOption: () => DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    ref: () => React.RefObject<HTMLInputElement>
    refOption: (
        o: React.RefObject<HTMLInputElement>
    ) => React.RefObject<HTMLInputElement> | undefined
    get: () => FieldValuesTypes | null
    getAsString: () => string | null
}

export enum FieldTypesNamesEnum {
    // BOOLEAN TYPES
    CHECK = 'checkbox',
    BOOLEAN = 'boolean',
    TOGGLE = 'toggle',

    // STRING TYPES
    TEXT = 'text',
    STRING = 'string',
    TEXTAREA = 'textarea',

    // NUMBER TYPES
    SELECT = 'select',
    NUMBER = 'number',
    RADIO = 'radio',
    BIGINT = 'bigint',
    RANGE = 'range',

    // NUMBER TYPES
    DATETIME = 'datetime',
    DATE = 'time'
}

export const booleanTypes = [
    FieldTypesNamesEnum.BOOLEAN.toString(),
    FieldTypesNamesEnum.CHECK.toString(),
    FieldTypesNamesEnum.TOGGLE.toString()
]

export const stringTypes = [
    FieldTypesNamesEnum.TEXT.toString(),
    FieldTypesNamesEnum.STRING.toString(),
    FieldTypesNamesEnum.TEXTAREA.toString(),
    FieldTypesNamesEnum.RADIO.toString()
]

export const numberTypes = [
    FieldTypesNamesEnum.SELECT.toString(),
    FieldTypesNamesEnum.NUMBER.toString(),
    FieldTypesNamesEnum.BIGINT.toString(),
    FieldTypesNamesEnum.RANGE.toString()
]

export const dateTypes = [
    FieldTypesNamesEnum.DATETIME.toString(),
    FieldTypesNamesEnum.DATE.toString()
]

export type fieldTypesConcatType =
    | typeof booleanTypes
    | typeof stringTypes
    | typeof numberTypes
    | typeof dateTypes
