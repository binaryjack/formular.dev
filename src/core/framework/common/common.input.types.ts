export enum InputTypesNamesEnum {
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
export type InputTypeNames = keyof typeof InputTypesNamesEnum

export const booleanTypes = [InputTypesNamesEnum.checkbox, InputTypesNamesEnum.toggle]

export const stringTypes = [
    InputTypesNamesEnum.text,
    InputTypesNamesEnum.richtext,
    InputTypesNamesEnum.radio,
    InputTypesNamesEnum.tel,
    InputTypesNamesEnum.email,
    InputTypesNamesEnum.password,
    InputTypesNamesEnum.url
]

export const numberTypes = [InputTypesNamesEnum.number, InputTypesNamesEnum.range]

export const optionBaseedNumericTypes = [InputTypesNamesEnum.select]

export const dateTypes = [InputTypesNamesEnum.date, InputTypesNamesEnum.time]

export type inputTypesConcatType =
    | typeof booleanTypes
    | typeof stringTypes
    | typeof numberTypes
    | typeof dateTypes
    | typeof optionBaseedNumericTypes
