export interface IValidationLocalize {
    locale: string
    validations: ILocalize[]
}

export interface ILocalize {
    key: string
    value: string
}
