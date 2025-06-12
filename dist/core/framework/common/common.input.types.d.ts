export declare enum InputTypesNamesEnum {
    checkbox = "checkbox",
    toggle = "toggle",
    text = "text",
    richtext = "richtext",
    radio = "radio",
    select = "select",
    number = "number",
    range = "range",
    date = "date",
    time = "time",
    tel = "tel",
    email = "email",
    url = "url",
    password = "password"
}
export type InputTypeNames = keyof typeof InputTypesNamesEnum;
export declare const booleanTypes: InputTypesNamesEnum[];
export declare const stringTypes: InputTypesNamesEnum[];
export declare const numberTypes: InputTypesNamesEnum[];
export declare const optionBaseedNumericTypes: InputTypesNamesEnum[];
export declare const dateTypes: InputTypesNamesEnum[];
export type inputTypesConcatType = typeof booleanTypes | typeof stringTypes | typeof numberTypes | typeof dateTypes | typeof optionBaseedNumericTypes;
