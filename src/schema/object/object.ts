import { SchemaBase } from '../base'
import { createTypeError } from '../error'
import { SchemaValidationError } from '../error/error'
import type { IObjectSchema, IObjectShape } from '../types'
import type { IObjectSchemaImpl } from './object.types'
import { extend, merge, omit, partial, pick, required } from './prototype'

export const ObjectSchema = function <T extends IObjectShape>(
    this: IObjectSchemaImpl<T>,
    shape: T
): void {
    // @ts-expect-error - SchemaBase.call() pattern has unavoidable type conflict with generic constructors
    SchemaBase.call(this, (value: unknown, path: string[]) => {
        if (typeof value !== 'object' || value === null || Array.isArray(value)) {
            throw new SchemaValidationError(createTypeError('object', path))
        }

        const objValue = value as Record<string, unknown>
        const result: Record<string, unknown> = {}
        const errors: any[] = []

        for (const key in this.shape) {
            const fieldSchema = this.shape[key]
            const fieldPath = [...path, key]
            
            try {
                // We MUST call parse() so that all transforms and refinements (e.g. min, max) run
                result[key] = fieldSchema.parse(objValue[key])
            } catch (err: any) {
                if (err.name === 'SchemaValidationError') {
                    // Inject the correct path into the nested errors
                    if (err.errors) {
                        for (const nestedErr of err.errors) {
                            errors.push({
                                ...nestedErr,
                                path: [...fieldPath, ...nestedErr.path]
                            })
                        }
                    } else {
                        errors.push({
                            ...err,
                            path: fieldPath
                        })
                    }
                } else {
                    errors.push({
                        message: err.message,
                        code: 'custom',
                        path: fieldPath
                    })
                }
            }
        }

        if (errors.length > 0) {
            const validationError = new SchemaValidationError(errors[0])
            validationError.errors = errors
            throw validationError
        }

        return result
    })

    this.shape = shape
    // @ts-expect-error - SchemaBase.call() pattern has unavoidable type conflict with generic constructors
    SchemaBase.call(this, (value: unknown, path: string[] = []) => {
        if (typeof value !== 'object' || value === null || Array.isArray(value)) {
            throw new Error(`Expected object, received ${value === null ? 'null' : typeof value}`)
        }
        
        const result: Record<string, unknown> = {}
        const errors: string[] = []
        
        for (const key in shape) {
            const schema = shape[key]
            const propertyValue = (value as Record<string, unknown>)[key]
            
            const parsed = schema.safeParse(propertyValue)
            if (parsed.success) {
                if (parsed.data !== undefined) {
                    result[key] = parsed.data
                }
            } else {
                errors.push(`${key}: ${parsed.error.message}`)
            }
        }
        
        if (errors.length > 0) {
            throw new Error(`Object validation failed: ${errors.join('; ')}`)
        }
        
        return result
    })
} as unknown as {
    new <T extends IObjectShape>(shape: T): IObjectSchema<T>
    prototype: any
}

ObjectSchema.prototype = Object.create(SchemaBase.prototype)
ObjectSchema.prototype.constructor = ObjectSchema

Object.assign(ObjectSchema.prototype, {
    partial,
    required,
    pick,
    omit,
    extend,
    merge
})
