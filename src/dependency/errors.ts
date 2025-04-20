export type ErrorCodes = 'API' | 'SAGA' | 'FORM'

export interface IApiError {
    origin?: string
    message?: string
    data?: unknown
}

export interface IErrors {
    code: string
    messagte: string
    stack: string[]
}

export interface IGeneralError {
    id: number
    origin: string
    message: string
    data: IFieldError | IApiError
}

export interface IFieldError {
    name: string
    code: string
    message?: string
}

export const newFieldError = (name: string, code: string, message?: string): IFieldError => {
    return {
        name,
        code,
        message
    } as IFieldError
}

export interface IFieldGuide {
    name: string
    code: string
    message?: string
}

export const newFieldGuide = (name: string, code: string, message?: string): IFieldGuide => {
    return {
        name,
        code,
        message
    } as IFieldGuide
}

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

export const ErrorIndex = (x: number) => {
    const incrementError = (y: number) => {
        x = x + y
        return x
    }
    return incrementError
}

export const GenErrorIds = ErrorIndex(0)

export class GeneralError extends Error {
    id = 0
    name = 'GeneralError'
    origin = ''
    innerError: FieldError | IApiError | undefined = undefined
    constructor(origin: string, message?: string, inner?: FieldError | IApiError, id?: number) {
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
    set data(error: FieldError | IApiError | undefined) {
        this.innerError = error
    }
    get data(): FieldError | IApiError | undefined {
        return this.innerError
    }

    get toGI(): IGeneralError {
        return {
            id: this.id,
            data: this.innerError,
            message: this.message,
            origin: this.origin
        } as IGeneralError
    }
}
