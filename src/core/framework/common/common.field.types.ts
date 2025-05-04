export enum FieldTypesNamesEnum {
    // BOOLEAN TYPES
    checkbox = 'checkbox',
    toggle = 'toggle',

    // STRING TYPES
    text = 'text',
    richtext = 'richtext',
    radio = 'radio',
    select = 'select',

    // NUMERIC TYPES
    number = 'number',
    range = 'range',

    // DATE TYPES
    date = 'date',
    time = 'time',

    // SPECIAL TYPES
    tel = 'tel',
    email = 'email',
    url = 'url',
    password = 'password'
}
export type FieldTypeNames = keyof typeof FieldTypesNamesEnum

export const booleanTypes = [FieldTypesNamesEnum.checkbox, FieldTypesNamesEnum.toggle]

export const stringTypes = [
    FieldTypesNamesEnum.text,
    FieldTypesNamesEnum.richtext,
    FieldTypesNamesEnum.radio,
    FieldTypesNamesEnum.tel,
    FieldTypesNamesEnum.email,
    FieldTypesNamesEnum.password,
    FieldTypesNamesEnum.url
]

export const numberTypes = [FieldTypesNamesEnum.number, FieldTypesNamesEnum.range]

export const optionBaseedNumericTypes = [FieldTypesNamesEnum.select]

export const dateTypes = [FieldTypesNamesEnum.date, FieldTypesNamesEnum.time]

export type fieldTypesConcatType =
    | typeof booleanTypes
    | typeof stringTypes
    | typeof numberTypes
    | typeof dateTypes
    | typeof optionBaseedNumericTypes
