/**
 * Base schema implementation
 * Foundation for all schema types
 */

import { createValidationError, SchemaValidationError } from './error'
import type {
    IParseFailure,
    IParseResult,
    IParseSuccess,
    IRefinementFn,
    IRefinementOptions,
    ISchemaBase,
    ITransformFn
} from './types'

interface IRefinement<T> {
    check: IRefinementFn<T>
    message: string
    code: string
}

export const SchemaBase = function <TOutput, TInput = TOutput>(
    this: ISchemaBaseImpl<TOutput, TInput>,
    _parse: (value: TInput, path: string[]) => TOutput
): void {
    this._parse = _parse
    this._refinements = []
    this._isOptional = false
    this._isNullable = false
    this._defaultValue = undefined
    this._transforms = []
} as unknown as {
    new <TOutput, TInput = TOutput>(
        _parse: (value: TInput, path: string[]) => TOutput
    ): ISchemaBaseImpl<TOutput, TInput>
    prototype: ISchemaBase
}

interface ISchemaBaseImpl<TOutput, TInput = TOutput> extends ISchemaBase<TOutput, TInput> {
    _parse: (value: TInput, path: string[]) => TOutput
    _refinements: IRefinement<TOutput>[]
    _isOptional: boolean
    _isNullable: boolean
    _defaultValue: TOutput | undefined
    _transforms: ITransformFn<unknown, unknown>[]
}

SchemaBase.prototype.parse = function <TOutput, TInput>(
    this: ISchemaBaseImpl<TOutput, TInput>,
    value: TInput
): TOutput {
    const result = this.safeParse(value)
    if (!result.success) {
        throw new SchemaValidationError(result.error)
    }
    return result.data
}

SchemaBase.prototype.safeParse = function <TOutput, TInput>(
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
                error: createValidationError('Value is required', 'required', [])
            }
        }

        // Handle null with nullable
        if (value === null) {
            if (this._isNullable) {
                return { success: true, data: null as TOutput }
            }
            return {
                success: false,
                error: createValidationError('Value cannot be null', 'invalid_type', [])
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
            error: createValidationError(error.message, 'custom', [])
        }
    }
}

SchemaBase.prototype.optional = function <TOutput, TInput>(
    this: ISchemaBaseImpl<TOutput, TInput>
): ISchemaBase<TOutput | undefined, TInput | undefined> {
    const cloned = Object.create(Object.getPrototypeOf(this)) as ISchemaBaseImpl<
        TOutput | undefined,
        TInput | undefined
    >
    cloned._parse = this._parse
    cloned._refinements = [...this._refinements]
    cloned._isOptional = true
    cloned._isNullable = this._isNullable
    cloned._defaultValue = this._defaultValue
    cloned._transforms = [...this._transforms]
    return cloned
}

SchemaBase.prototype.nullable = function <TOutput, TInput>(
    this: ISchemaBaseImpl<TOutput, TInput>
): ISchemaBase<TOutput | null, TInput | null> {
    const cloned = Object.create(Object.getPrototypeOf(this)) as ISchemaBaseImpl<
        TOutput | null,
        TInput | null
    >
    cloned._parse = this._parse
    cloned._refinements = [...this._refinements]
    cloned._isOptional = this._isOptional
    cloned._isNullable = true
    cloned._defaultValue = this._defaultValue
    cloned._transforms = [...this._transforms]
    return cloned
}

SchemaBase.prototype.default = function <TOutput, TInput>(
    this: ISchemaBaseImpl<TOutput, TInput>,
    value: TOutput
): ISchemaBase<TOutput, TInput> {
    const cloned = Object.create(Object.getPrototypeOf(this)) as ISchemaBaseImpl<TOutput, TInput>
    cloned._parse = this._parse
    cloned._refinements = [...this._refinements]
    cloned._isOptional = this._isOptional
    cloned._isNullable = this._isNullable
    cloned._defaultValue = value
    cloned._transforms = [...this._transforms]
    return cloned
}

SchemaBase.prototype.transform = function <TOutput, TInput, TNewOutput>(
    this: ISchemaBaseImpl<TOutput, TInput>,
    fn: ITransformFn<TOutput, TNewOutput>
): ISchemaBase<TNewOutput, TInput> {
    const cloned = Object.create(Object.getPrototypeOf(this)) as ISchemaBaseImpl<TNewOutput, TInput>
    cloned._parse = this._parse as unknown as (value: TInput, path: string[]) => TNewOutput
    cloned._refinements = []
    cloned._isOptional = this._isOptional
    cloned._isNullable = this._isNullable
    cloned._defaultValue = undefined
    cloned._transforms = [...this._transforms, fn as ITransformFn<unknown, unknown>]
    return cloned
}

SchemaBase.prototype.refine = function <TOutput, TInput>(
    this: ISchemaBaseImpl<TOutput, TInput>,
    check: IRefinementFn<TOutput>,
    options: IRefinementOptions = {}
): ISchemaBase<TOutput, TInput> {
    const cloned = Object.create(Object.getPrototypeOf(this)) as ISchemaBaseImpl<TOutput, TInput>
    cloned._parse = this._parse
    cloned._refinements = [
        ...this._refinements,
        {
            check,
            message: options.message ?? 'Validation failed',
            code: options.code ?? 'custom'
        }
    ]
    cloned._isOptional = this._isOptional
    cloned._isNullable = this._isNullable
    cloned._defaultValue = this._defaultValue
    cloned._transforms = [...this._transforms]
    return cloned
}

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
