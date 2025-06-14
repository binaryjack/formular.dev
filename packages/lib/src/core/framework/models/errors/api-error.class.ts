import { IApiError } from './i-api-error'

export class ApiError extends Error {
    name = 'ApiError'
    apiError: IApiError | undefined = undefined

    constructor(error: IApiError | undefined) {
        if (!error) {
            super('unexpected Error')
            return
        }
        super(error.message)
        this.apiError = error
        this.name = 'ApiError'
    }

    set data(error: IApiError | undefined) {
        this.apiError = error
    }

    get data(): IApiError | undefined {
        return this.apiError
    }
}
