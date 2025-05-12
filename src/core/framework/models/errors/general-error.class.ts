import { GenErrorIds } from './gen-error-ids'
import { IGeneralError } from './i-general-error'

export type GeneralErrorType = 'FieldError' | 'ApiError'

export class GeneralError extends Error {
    id = 0
    name = 'GeneralError'
    origin = ''
    innerError: GeneralErrorType | undefined = undefined

    constructor(origin: string, message?: string, inner?: GeneralErrorType, id?: number) {
        if (!message) {
            super('unexpected Error')
            return
        }
        super(message)
        this.id = GenErrorIds(1)
        this.origin = origin
        this.name = 'GeneralError'
        this.innerError = inner
    }

    set data(error: GeneralErrorType | undefined) {
        this.innerError = error
    }

    get data(): GeneralErrorType | undefined {
        return this.innerError
    }

    get toGI(): IGeneralError {
        return {
            id: this.id,
            data: this.innerError,
            message: this.message,
            origin: this.origin
        } as unknown as IGeneralError
    }
}
