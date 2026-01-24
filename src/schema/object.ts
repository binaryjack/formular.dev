/**
 * Object schema implementation
 */

import { SchemaBase } from './base'
import { createTypeError } from './error'
import type { IInferShape, IObjectSchema, IObjectShape, ISchemaBase } from './types'

export const ObjectSchema = function <T extends IObjectShape>(
    this: IObjectSchemaImpl<T>,
    shape: T
): void {
    this.shape = shape
    SchemaBase.call(this, (value: unknown, path: string[]) => {
        if (typeof value !== 'object' || value === null || Array.isArray(value)) {
            throw new Error(createTypeError('object', path).message)
        }

        const result: Record<string, unknown> = {}
        const input = value as Record<string, unknown>

        for (const key in shape) {
            if (Object.prototype.hasOwnProperty.call(shape, key)) {
                try {
                    result[key] = shape[key].parse(input[key])
                } catch (err) {
                    const error = err as Error
                    throw new Error(`At key "${key}": ${error.message}`)
                }
            }
        }

        return result as IInferShape<T>
    })
} as unknown as {
    new <T extends IObjectShape>(shape: T): IObjectSchemaImpl<T>
    prototype: IObjectSchema<any>
}

interface IObjectSchemaImpl<T extends IObjectShape> extends IObjectSchema<T> {
    shape: T
    _parse: (value: unknown, path: string[]) => IInferShape<T>
    _refinements: Array<{
        check: (val: IInferShape<T>) => boolean
        message: string
        code: string
    }>
    _isOptional: boolean
    _isNullable: boolean
    _defaultValue: IInferShape<T> | undefined
    _transforms: Array<(val: unknown) => unknown>
}

ObjectSchema.prototype = Object.create(SchemaBase.prototype)
ObjectSchema.prototype.constructor = ObjectSchema

ObjectSchema.prototype.partial = function <T extends IObjectShape>(
    this: IObjectSchemaImpl<T>
): IObjectSchema<{ [K in keyof T]: ISchemaBase<IInferShape<T>[K] | undefined> }> {
    const newShape: Record<string, ISchemaBase> = {}

    for (const key in this.shape) {
        if (Object.prototype.hasOwnProperty.call(this.shape, key)) {
            newShape[key] = this.shape[key].optional()
        }
    }

    return new ObjectSchema(
        newShape as { [K in keyof T]: ISchemaBase<IInferShape<T>[K] | undefined> }
    )
}

ObjectSchema.prototype.required = function <T extends IObjectShape>(
    this: IObjectSchemaImpl<T>
): IObjectSchema<T> {
    return new ObjectSchema(this.shape)
}

ObjectSchema.prototype.pick = function <T extends IObjectShape, K extends keyof T>(
    this: IObjectSchemaImpl<T>,
    keys: readonly K[]
): IObjectSchema<Pick<T, K>> {
    const newShape: Record<string, ISchemaBase> = {}

    for (const key of keys) {
        if (Object.prototype.hasOwnProperty.call(this.shape, key)) {
            newShape[key as string] = this.shape[key]
        }
    }

    return new ObjectSchema(newShape as Pick<T, K>)
}

ObjectSchema.prototype.omit = function <T extends IObjectShape, K extends keyof T>(
    this: IObjectSchemaImpl<T>,
    keys: readonly K[]
): IObjectSchema<Omit<T, K>> {
    const newShape: Record<string, ISchemaBase> = {}
    const omitSet = new Set(keys)

    for (const key in this.shape) {
        if (Object.prototype.hasOwnProperty.call(this.shape, key) && !omitSet.has(key as K)) {
            newShape[key] = this.shape[key]
        }
    }

    return new ObjectSchema(newShape as Omit<T, K>)
}

ObjectSchema.prototype.extend = function <T extends IObjectShape, U extends IObjectShape>(
    this: IObjectSchemaImpl<T>,
    schema: U
): IObjectSchema<T & U> {
    const newShape = { ...this.shape, ...schema }
    return new ObjectSchema(newShape as T & U)
}

ObjectSchema.prototype.merge = function <T extends IObjectShape, U extends IObjectShape>(
    this: IObjectSchemaImpl<T>,
    schema: IObjectSchema<U>
): IObjectSchema<T & U> {
    const newShape = { ...this.shape, ...(schema as IObjectSchemaImpl<U>).shape }
    return new ObjectSchema(newShape as T & U)
}
