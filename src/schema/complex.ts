/**
 * Union and Record schema implementations
 */

import { SchemaBase } from './base'
import { createTypeError } from './error'
import type { IRecordSchema, ISchemaBase, IUnionSchema } from './types'

// =============================================
// UNION SCHEMA
// =============================================

export const UnionSchema = function <T extends readonly ISchemaBase[]>(
    this: IUnionSchemaImpl<T>,
    options: T
): void {
    this.options = options
    SchemaBase.call(this, (value: unknown, path: string[]) => {
        const errors: string[] = []

        for (const schema of options) {
            const result = schema.safeParse(value)
            if (result.success) {
                return result.data as T[number]['_output']
            }
            errors.push(result.error.message)
        }

        throw new Error(`No union variant matched. Errors: ${errors.join('; ')}`)
    })
} as unknown as {
    new <T extends readonly ISchemaBase[]>(options: T): IUnionSchemaImpl<T>
    prototype: IUnionSchema<any>
}

interface IUnionSchemaImpl<T extends readonly ISchemaBase[]> extends IUnionSchema<T> {
    options: T
    _parse: (value: unknown, path: string[]) => T[number]['_output']
    _refinements: Array<{
        check: (val: T[number]['_output']) => boolean
        message: string
        code: string
    }>
    _isOptional: boolean
    _isNullable: boolean
    _defaultValue: T[number]['_output'] | undefined
    _transforms: Array<(val: unknown) => unknown>
}

UnionSchema.prototype = Object.create(SchemaBase.prototype)
UnionSchema.prototype.constructor = UnionSchema

// =============================================
// RECORD SCHEMA
// =============================================

export const RecordSchema = function <K extends string | number, V>(
    this: IRecordSchemaImpl<K, V>,
    keySchema: ISchemaBase<K>,
    valueSchema: ISchemaBase<V>
): void {
    this.keySchema = keySchema
    this.valueSchema = valueSchema
    SchemaBase.call(this, (value: unknown, path: string[]) => {
        if (typeof value !== 'object' || value === null || Array.isArray(value)) {
            throw new Error(createTypeError('record', path).message)
        }

        const result: Record<K, V> = {} as Record<K, V>
        const input = value as Record<string, unknown>

        for (const key in input) {
            if (Object.prototype.hasOwnProperty.call(input, key)) {
                try {
                    const parsedKey = keySchema.parse(key as K)
                    const parsedValue = valueSchema.parse(input[key])
                    result[parsedKey] = parsedValue
                } catch (err) {
                    const error = err as Error
                    throw new Error(`At key "${key}": ${error.message}`)
                }
            }
        }

        return result
    })
} as unknown as {
    new <K extends string | number, V>(
        keySchema: ISchemaBase<K>,
        valueSchema: ISchemaBase<V>
    ): IRecordSchemaImpl<K, V>
    prototype: IRecordSchema<any, any>
}

interface IRecordSchemaImpl<K extends string | number, V> extends IRecordSchema<K, V> {
    keySchema: ISchemaBase<K>
    valueSchema: ISchemaBase<V>
    _parse: (value: unknown, path: string[]) => Record<K, V>
    _refinements: Array<{
        check: (val: Record<K, V>) => boolean
        message: string
        code: string
    }>
    _isOptional: boolean
    _isNullable: boolean
    _defaultValue: Record<K, V> | undefined
    _transforms: Array<(val: unknown) => unknown>
}

RecordSchema.prototype = Object.create(SchemaBase.prototype)
RecordSchema.prototype.constructor = RecordSchema
