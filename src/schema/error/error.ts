import type { IValidationError } from '../types'
import type { ISchemaValidationError } from './error.types'

export const SchemaValidationError = function (
    this: ISchemaValidationError,
    error: IValidationError
): void {
    this.name = 'SchemaValidationError'
    this.message = error.message
    this.code = error.code
    this.path = error.path
    this.errors = [error]

    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, SchemaValidationError as unknown as () => void)
    }
} as unknown as {
    new (error: IValidationError): ISchemaValidationError
    prototype: ISchemaValidationError
}

SchemaValidationError.prototype = Object.create(Error.prototype)
SchemaValidationError.prototype.constructor = SchemaValidationError
SchemaValidationError.prototype.name = 'SchemaValidationError'
