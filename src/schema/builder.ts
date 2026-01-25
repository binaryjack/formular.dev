/**
 * Schema builder API
 * Main entry point for creating schemas
 */

import { ArraySchema } from './array'
import { RecordSchema } from './record'
import { UnionSchema } from './union'
import { NumberSchema } from './number'
import { ObjectSchema } from './object'
import { BooleanSchema } from './boolean'
import { DateSchema } from './date'
import { EnumSchema } from './enum'
import { LiteralSchema } from './literal'
import { StringSchema } from './string'
import type {
    IArraySchema,
    IBooleanSchema,
    IDateSchema,
    IEnumSchema,
    IInfer,
    ILiteralSchema,
    INumberSchema,
    IObjectSchema,
    IObjectShape,
    IRecordSchema,
    ISchemaBase,
    IStringSchema,
    IUnionSchema
} from './types'

/**
 * Schema builder namespace
 * Provides factory functions for creating all schema types
 *
 * @example
 * ```typescript
 * import { f } from 'formular.dev'
 *
 * const userSchema = f.object({
 *   email: f.string().email(),
 *   age: f.number().min(18).max(100)
 * })
 *
 * type User = f.infer<typeof userSchema>
 * ```
 */
export const f = {
    /**
     * Create a string schema
     */
    string(): IStringSchema {
        return new StringSchema()
    },

    /**
     * Create a number schema
     */
    number(): INumberSchema {
        return new NumberSchema()
    },

    /**
     * Create a boolean schema
     */
    boolean(): IBooleanSchema {
        return new BooleanSchema()
    },

    /**
     * Create a date schema
     */
    date(): IDateSchema {
        return new DateSchema()
    },

    /**
     * Create a literal schema
     */
    literal<T extends string | number | boolean>(value: T): ILiteralSchema<T> {
        return new LiteralSchema(value)
    },

    /**
     * Create an enum schema
     */
    enum<T extends readonly [string, ...string[]]>(values: T): IEnumSchema<T> {
        return new EnumSchema(values)
    },

    /**
     * Create an array schema
     */
    array<T>(element: ISchemaBase<T>): IArraySchema<T> {
        return new ArraySchema(element)
    },

    /**
     * Create an object schema
     */
    object<T extends IObjectShape>(shape: T): IObjectSchema<T> {
        return new ObjectSchema(shape)
    },

    /**
     * Create a union schema
     */
    union<T extends readonly ISchemaBase[]>(...options: T): IUnionSchema<T> {
        return new UnionSchema(options)
    },

    /**
     * Create a record schema
     */
    record<K extends string | number, V>(
        keySchema: ISchemaBase<K>,
        valueSchema: ISchemaBase<V>
    ): IRecordSchema<K, V> {
        return new RecordSchema(keySchema, valueSchema)
    },

    /**
     * Type inference helper
     * Extract TypeScript type from schema
     */
    infer: <T extends ISchemaBase>(schema: T): IInfer<T> => {
        return undefined as IInfer<T>
    }
}

/**
 * Alias for f.infer
 */
export type infer<T extends ISchemaBase> = IInfer<T>
