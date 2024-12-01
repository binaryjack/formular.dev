import { IErrors } from '../../../dependency/errors'
import { IFieldDescriptor } from '../../../dependency/schema/descriptor/field.descriptor'
import { IFieldInputBase } from '../../field/fieldInputBase/fieldInputBase.types'
import { INotifiableEntity } from '../../field/notifiableEntityBase/notifiableEntityBase.types'
import { LoadingStatus } from '../../status'

export interface IFormFlags {
    isLoading: boolean
    isSubmitting: boolean
    isResetting: boolean
    isValidating: boolean
    isValid: boolean
}

export interface IFormBase extends INotifiableEntity {
    new (id: string): IFormBase
    id: string
    fields: IFieldInputBase[]
    originFields: IFieldInputBase[]

    errors: IErrors[]
    isDirty: boolean
    isValid: boolean
    isValidating: boolean
    isBusy: LoadingStatus
    isSubmitting: boolean
    submitCount: number
    canValidate: boolean

    addFields: (...flds: IFieldInputBase[]) => void
    validateAll: () => void
}

export enum FieldTypesNamesEnum {
    // BOOLEAN TYPES
    CHECK = 'check',
    BOOLEAN = 'boolean',
    TOGGLE = 'toggle',

    // STRING TYPES
    TEXT = 'text',
    STRING = 'string',
    TEXTAREA = 'textares',

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
    FieldTypesNamesEnum.TEXTAREA.toString()
]

export const numberTypes = [
    FieldTypesNamesEnum.SELECT.toString(),
    FieldTypesNamesEnum.NUMBER.toString(),
    FieldTypesNamesEnum.RADIO.toString(),
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

export interface IFormsy {
    id: string
    errors: IErrors[]
    isDirty: boolean
    isValid: boolean
    isValidating: boolean
    isBusy: LoadingStatus
    isSubmitting: boolean
    submitCount: number
    canValidate: boolean
    fields: IFieldDescriptor[]
    originalFields: IFieldDescriptor[]
}

/** idem as  <formsyType extends keyof IFormsy> */
export type TFormsy = {
    [key in keyof IFormsy]: string
}

export const defaultFormsyState: IFormsy = {
    id: '',
    errors: [],
    isDirty: false,
    isValid: true,
    isValidating: false,
    isSubmitting: false,
    isBusy: LoadingStatus.Loaded,
    submitCount: 0,
    canValidate: false,
    fields: [],
    originalFields: []
}
