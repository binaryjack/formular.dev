/**
 * Number schema implementation
 */

import { SchemaBase } from './base'
import { DefaultErrorMessages, SchemaErrorCode } from './constants'
import { createTypeError } from './error'
import type { INumberSchema } from './types'

export const NumberSchema = function (this: INumberSchemaImpl): void {
    SchemaBase.call(this, (value: unknown, path: string[]) => {
        if (typeof value === 'string' && !isNaN(Number(value))) {
            return Number(value)
        }
        if (typeof value !== 'number') {
            throw new Error(createTypeError('number', path).message)
        }
        if (isNaN(value)) {
            throw new Error('Value is NaN')
        }
        return value
    })
} as unknown as {
    new (): INumberSchemaImpl
    prototype: INumberSchema
}

interface INumberSchemaImpl extends INumberSchema {
    _parse: (value: unknown, path: string[]) => number
    _refinements: Array<{
        check: (val: number) => boolean
        message: string
        code: string
    }>
    _isOptional: boolean
    _isNullable: boolean
    _defaultValue: number | undefined
    _transforms: Array<(val: unknown) => unknown>
}

NumberSchema.prototype = Object.create(SchemaBase.prototype)
NumberSchema.prototype.constructor = NumberSchema

NumberSchema.prototype.min = function (
    this: INumberSchemaImpl,
    value: number,
    message?: string
): INumberSchema {
    return this.refine((val) => val >= value, {
        message: message ?? DefaultErrorMessages.tooSmall(value, 'number'),
        code: SchemaErrorCode.TooSmall
    }) as INumberSchema
}

NumberSchema.prototype.max = function (
    this: INumberSchemaImpl,
    value: number,
    message?: string
): INumberSchema {
    return this.refine((val) => val <= value, {
        message: message ?? DefaultErrorMessages.tooBig(value, 'number'),
        code: SchemaErrorCode.TooBig
    }) as INumberSchema
}

NumberSchema.prototype.int = function (this: INumberSchemaImpl, message?: string): INumberSchema {
    return this.refine((val) => Number.isInteger(val), {
        message: message ?? DefaultErrorMessages.invalidInteger,
        code: SchemaErrorCode.InvalidNumber
    }) as INumberSchema
}

NumberSchema.prototype.positive = function (
    this: INumberSchemaImpl,
    message?: string
): INumberSchema {
    return this.refine((val) => val > 0, {
        message: message ?? DefaultErrorMessages.invalidPositive,
        code: SchemaErrorCode.InvalidNumber
    }) as INumberSchema
}

NumberSchema.prototype.negative = function (
    this: INumberSchemaImpl,
    message?: string
): INumberSchema {
    return this.refine((val) => val < 0, {
        message: message ?? DefaultErrorMessages.invalidNegative,
        code: SchemaErrorCode.InvalidNumber
    }) as INumberSchema
}

NumberSchema.prototype.nonpositive = function (
    this: INumberSchemaImpl,
    message?: string
): INumberSchema {
    return this.refine((val) => val <= 0, {
        message: message ?? 'Number must be non-positive',
        code: SchemaErrorCode.InvalidNumber
    }) as INumberSchema
}

NumberSchema.prototype.nonnegative = function (
    this: INumberSchemaImpl,
    message?: string
): INumberSchema {
    return this.refine((val) => val >= 0, {
        message: message ?? 'Number must be non-negative',
        code: SchemaErrorCode.InvalidNumber
    }) as INumberSchema
}

NumberSchema.prototype.multipleOf = function (
    this: INumberSchemaImpl,
    value: number,
    message?: string
): INumberSchema {
    return this.refine((val) => val % value === 0, {
        message: message ?? `Number must be a multiple of ${value}`,
        code: SchemaErrorCode.InvalidNumber
    }) as INumberSchema
}

NumberSchema.prototype.finite = function (
    this: INumberSchemaImpl,
    message?: string
): INumberSchema {
    return this.refine((val) => Number.isFinite(val), {
        message: message ?? 'Number must be finite',
        code: SchemaErrorCode.InvalidNumber
    }) as INumberSchema
}

NumberSchema.prototype.safe = function (this: INumberSchemaImpl, message?: string): INumberSchema {
    return this.refine((val) => Number.isSafeInteger(val), {
        message: message ?? 'Number must be a safe integer',
        code: SchemaErrorCode.InvalidNumber
    }) as INumberSchema
}
