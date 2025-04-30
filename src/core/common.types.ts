export type HTMLInputTypes =
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'textarea'
    | 'time'
    | 'url'
    | 'week'

export type FieldInputStateType =
    | 'dirty'
    | 'valid'
    | 'pristine'
    | 'focus'
    | 'open'
    | 'errors'
    /* even if required is not necessary an input flag and while it's a dupplicate value whitch is available in validation 
    it's convinient to have it as an input flag. All the flags are calculated as a separate object which can be useed outside the component and the field itself */
    | 'required'
    /* this will reset the style flags */
    | 'clear'

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

export type FieldTypes = keyof typeof FieldTypesNamesEnum

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
    FieldTypesNamesEnum.NUMBER.toString(),
    FieldTypesNamesEnum.BIGINT.toString(),
    FieldTypesNamesEnum.RANGE.toString()
]

export const optionBaseedNumericTypes = [FieldTypesNamesEnum.SELECT.toString()]

export const dateTypes = [
    FieldTypesNamesEnum.DATETIME.toString(),
    FieldTypesNamesEnum.DATE.toString()
]

export type fieldTypesConcatType =
    | typeof booleanTypes
    | typeof stringTypes
    | typeof numberTypes
    | typeof dateTypes
    | typeof optionBaseedNumericTypes
