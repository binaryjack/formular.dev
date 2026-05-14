import { IFieldError } from './i-field-error'

export class FieldError extends Error {
    name = 'FieldError'
    fieldError: IFieldError | undefined = undefined

    constructor(error?: IFieldError | undefined) {
        if (!error) {
            super('unexpected Error')
            return
        }
        super(error.message)
        this.fieldError = error
        this.name = 'FieldError'
    }

    set data(error: IFieldError | undefined) {
        this.fieldError = error
    }

    get data(): IFieldError | undefined {
        return this.fieldError
    }
}
