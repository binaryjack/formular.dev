import { IFieldError } from './i-field-error'

export const newFieldError = (name: string, code: string, message?: string): IFieldError => {
    return {
        name,
        code,
        message
    } as IFieldError
}
