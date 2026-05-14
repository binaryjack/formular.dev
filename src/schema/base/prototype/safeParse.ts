import { SchemaErrorCode } from '../../constants'
import { createValidationError } from '../../error'
import type { IParseResult } from '../../types'
import type { ISchemaBaseImpl } from '../base.types'

export function safeParse<TOutput, TInput>(
    this: ISchemaBaseImpl<TOutput, TInput>,
    value: TInput
): IParseResult<TOutput> {
    try {
        // Handle undefined with optional
        if (value === undefined) {
            if (this._isOptional) {
                return { success: true, data: undefined as TOutput }
            }
            if (this._defaultValue !== undefined) {
                return { success: true, data: this._defaultValue }
            }
            return {
                success: false,
                error: createValidationError('Value is required', SchemaErrorCode.Required, [])
            }
        }

        // Handle null with nullable
        if (value === null) {
            if (this._isNullable) {
                return { success: true, data: null as TOutput }
            }
            return {
                success: false,
                error: createValidationError(
                    'Value cannot be null',
                    SchemaErrorCode.InvalidType,
                    []
                )
            }
        }

        // Parse value
        let parsed = this._parse(value, [])

        // Apply transforms
        for (const transform of this._transforms) {
            parsed = transform(parsed) as TOutput
        }

        // Apply refinements
        for (const refinement of this._refinements) {
            if (!refinement.check(parsed)) {
                return {
                    success: false,
                    error: createValidationError(refinement.message, refinement.code, [])
                }
            }
        }

        return { success: true, data: parsed }
    } catch (err) {
        const error = err as Error
        return {
            success: false,
            error: createValidationError(error.message, SchemaErrorCode.Custom, [])
        }
    }
}
