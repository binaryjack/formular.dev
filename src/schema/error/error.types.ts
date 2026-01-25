import type { IValidationError } from '../types'

export interface ISchemaValidationError extends Error {
    code: string
    path: string[]
    errors: readonly IValidationError[]
}
