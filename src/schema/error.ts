/**
 * Schema validation error
 * Custom error class for schema validation failures
 */

import { SchemaErrorCode } from './constants'
import type { IValidationError } from './types'

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

export interface ISchemaValidationError extends Error {
    readonly code: string
    readonly path: string[]
    readonly errors: readonly IValidationError[]
}

SchemaValidationError.prototype = Object.create(Error.prototype)
SchemaValidationError.prototype.constructor = SchemaValidationError
SchemaValidationError.prototype.name = 'SchemaValidationError'

/**
 * Create validation error
 */
export function createValidationError(
    message: string,
    code: SchemaErrorCode = SchemaErrorCode.Custom,
    path: string[] = []
): IValidationError {
    return {
        message,
        code,
        path
    }
}

/**
 * Create type error
 */
export function createTypeError(expected: string, path: string[] = []): IValidationError {
    return createValidationError(`Expected ${expected}`, SchemaErrorCode.InvalidType, path)
}
