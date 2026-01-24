/**
 * Boolean, Date, Literal, and Enum schema implementations
 */

import { SchemaBase } from './base'
import { SchemaErrorCode } from './constants'
import { createTypeError } from './error'
import type { IBooleanSchema, IDateSchema, IEnumSchema, ILiteralSchema } from './types'

// =============================================
// BOOLEAN SCHEMA
// =============================================

export const BooleanSchema = function (this: IBooleanSchemaImpl): void {
    SchemaBase.call(this, (value: unknown, path: string[]) => {
        if (typeof value !== 'boolean') {
            throw new Error(createTypeError('boolean', path).message)
        }
        return value
    })
} as unknown as {
    new (): IBooleanSchemaImpl
    prototype: IBooleanSchema
}

interface IBooleanSchemaImpl extends IBooleanSchema {
    _parse: (value: unknown, path: string[]) => boolean
    _refinements: Array<{
        check: (val: boolean) => boolean
        message: string
        code: string
    }>
    _isOptional: boolean
    _isNullable: boolean
    _defaultValue: boolean | undefined
    _transforms: Array<(val: unknown) => unknown>
}

BooleanSchema.prototype = Object.create(SchemaBase.prototype)
BooleanSchema.prototype.constructor = BooleanSchema

BooleanSchema.prototype.true = function (
    this: IBooleanSchemaImpl,
    message?: string
): IBooleanSchema {
    return this.refine((val) => val === true, {
        message: message ?? 'Value must be true',
        code: SchemaErrorCode.Custom
    }) as IBooleanSchema
}

BooleanSchema.prototype.false = function (
    this: IBooleanSchemaImpl,
    message?: string
): IBooleanSchema {
    return this.refine((val) => val === false, {
        message: message ?? 'Value must be false',
        code: SchemaErrorCode.Custom
    }) as IBooleanSchema
}

// =============================================
// DATE SCHEMA
// =============================================

export const DateSchema = function (this: IDateSchemaImpl): void {
    SchemaBase.call(this, (value: unknown, path: string[]) => {
        if (value instanceof Date) {
            if (isNaN(value.getTime())) {
                throw new Error('Invalid date')
            }
            return value
        }
        if (typeof value === 'string' || typeof value === 'number') {
            const date = new Date(value)
            if (isNaN(date.getTime())) {
                throw new Error('Invalid date')
            }
            return date
        }
        throw new Error(createTypeError('date', path).message)
    })
} as unknown as {
    new (): IDateSchemaImpl
    prototype: IDateSchema
}

interface IDateSchemaImpl extends IDateSchema {
    _parse: (value: unknown, path: string[]) => Date
    _refinements: Array<{
        check: (val: Date) => boolean
        message: string
        code: string
    }>
    _isOptional: boolean
    _isNullable: boolean
    _defaultValue: Date | undefined
    _transforms: Array<(val: unknown) => unknown>
}

DateSchema.prototype = Object.create(SchemaBase.prototype)
DateSchema.prototype.constructor = DateSchema

DateSchema.prototype.min = function (
    this: IDateSchemaImpl,
    date: Date,
    message?: string
): IDateSchema {
    return this.refine((val) => val.getTime() >= date.getTime(), {
        message: message ?? `Date must be after ${date.toISOString()}`,
        code: SchemaErrorCode.TooSmall
    }) as IDateSchema
}

DateSchema.prototype.max = function (
    this: IDateSchemaImpl,
    date: Date,
    message?: string
): IDateSchema {
    return this.refine((val) => val.getTime() <= date.getTime(), {
        message: message ?? `Date must be before ${date.toISOString()}`,
        code: SchemaErrorCode.TooBig
    }) as IDateSchema
}

// =============================================
// LITERAL SCHEMA
// =============================================

export const LiteralSchema = function <T extends string | number | boolean>(
    this: ILiteralSchemaImpl<T>,
    value: T
): void {
    this.value = value
    SchemaBase.call(this, (input: unknown, path: string[]) => {
        if (input !== value) {
            throw new Error(`Value must be ${value}`)
        }
        return value
    })
} as unknown as {
    new <T extends string | number | boolean>(value: T): ILiteralSchemaImpl<T>
    prototype: ILiteralSchema<any>
}

interface ILiteralSchemaImpl<T extends string | number | boolean> extends ILiteralSchema<T> {
    value: T
    _parse: (value: unknown, path: string[]) => T
    _refinements: Array<{
        check: (val: T) => boolean
        message: string
        code: string
    }>
    _isOptional: boolean
    _isNullable: boolean
    _defaultValue: T | undefined
    _transforms: Array<(val: unknown) => unknown>
}

LiteralSchema.prototype = Object.create(SchemaBase.prototype)
LiteralSchema.prototype.constructor = LiteralSchema

// =============================================
// ENUM SCHEMA
// =============================================

export const EnumSchema = function <T extends readonly [string, ...string[]]>(
    this: IEnumSchemaImpl<T>,
    values: T
): void {
    this.values = values
    SchemaBase.call(this, (input: unknown, path: string[]) => {
        if (typeof input !== 'string' || !values.includes(input)) {
            throw new Error(`Value must be one of: ${values.join(', ')}`)
        }
        return input as T[number]
    })
} as unknown as {
    new <T extends readonly [string, ...string[]]>(values: T): IEnumSchemaImpl<T>
    prototype: IEnumSchema<any>
}

interface IEnumSchemaImpl<T extends readonly [string, ...string[]]> extends IEnumSchema<T> {
    values: T
    _parse: (value: unknown, path: string[]) => T[number]
    _refinements: Array<{
        check: (val: T[number]) => boolean
        message: string
        code: string
    }>
    _isOptional: boolean
    _isNullable: boolean
    _defaultValue: T[number] | undefined
    _transforms: Array<(val: unknown) => unknown>
}

EnumSchema.prototype = Object.create(SchemaBase.prototype)
EnumSchema.prototype.constructor = EnumSchema
