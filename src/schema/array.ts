/**
 * Array schema implementation
 */

import { SchemaBase } from './base'
import { DefaultErrorMessages, SchemaErrorCode } from './constants'
import { createTypeError } from './error'
import type { IArraySchema, ISchemaBase } from './types'

export const ArraySchema = function <T>(this: IArraySchemaImpl<T>, element: ISchemaBase<T>): void {
    this.element = element
    SchemaBase.call(this, (value: unknown, path: string[]) => {
        if (!Array.isArray(value)) {
            throw new Error(createTypeError('array', path).message)
        }
        return value.map((item, index) => {
            try {
                return element.parse(item)
            } catch (err) {
                const error = err as Error
                throw new Error(`At index ${index}: ${error.message}`)
            }
        })
    })
} as unknown as {
    new <T>(element: ISchemaBase<T>): IArraySchemaImpl<T>
    prototype: IArraySchema<any>
}

interface IArraySchemaImpl<T> extends IArraySchema<T> {
    element: ISchemaBase<T>
    _parse: (value: unknown, path: string[]) => T[]
    _refinements: Array<{
        check: (val: T[]) => boolean
        message: string
        code: string
    }>
    _isOptional: boolean
    _isNullable: boolean
    _defaultValue: T[] | undefined
    _transforms: Array<(val: unknown) => unknown>
}

ArraySchema.prototype = Object.create(SchemaBase.prototype)
ArraySchema.prototype.constructor = ArraySchema

ArraySchema.prototype.min = function <T>(
    this: IArraySchemaImpl<T>,
    length: number,
    message?: string
): IArraySchema<T> {
    return this.refine((val) => val.length >= length, {
        message: message ?? DefaultErrorMessages.tooSmall(length, 'array'),
        code: SchemaErrorCode.TooSmall
    }) as IArraySchema<T>
}

ArraySchema.prototype.max = function <T>(
    this: IArraySchemaImpl<T>,
    length: number,
    message?: string
): IArraySchema<T> {
    return this.refine((val) => val.length <= length, {
        message: message ?? DefaultErrorMessages.tooBig(length, 'array'),
        code: SchemaErrorCode.TooBig
    }) as IArraySchema<T>
}

ArraySchema.prototype.length = function <T>(
    this: IArraySchemaImpl<T>,
    length: number,
    message?: string
): IArraySchema<T> {
    return this.refine((val) => val.length === length, {
        message: message ?? `Array must contain exactly ${length} element(s)`,
        code: SchemaErrorCode.InvalidType
    }) as IArraySchema<T>
}

ArraySchema.prototype.nonempty = function <T>(
    this: IArraySchemaImpl<T>,
    message?: string
): IArraySchema<T> {
    return this.refine((val) => val.length > 0, {
        message: message ?? 'Array cannot be empty',
        code: SchemaErrorCode.Required
    }) as IArraySchema<T>
}
