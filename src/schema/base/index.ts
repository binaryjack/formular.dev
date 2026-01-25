export { SchemaBase } from './base'
export type { IRefinement, ISchemaBaseImpl } from './base.types'

import type { IParseFailure, IParseSuccess, IValidationError } from '../types'

/**
 * Helper to create a success result
 */
export function success<T>(data: T): IParseSuccess<T> {
    return { success: true, data }
}

/**
 * Helper to create a failure result
 */
export function failure(error: IValidationError): IParseFailure {
    return { success: false, error }
}
