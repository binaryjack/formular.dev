export { SchemaValidationError } from './error'
export type { ISchemaValidationError } from './error.types'

import { SchemaErrorCode } from '../constants'
import type { IValidationError } from '../types'

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
