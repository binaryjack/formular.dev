import { SchemaBase } from '../base'
import type { IObjectSchema, IObjectShape } from '../types'
import type { IObjectSchemaImpl } from './object.types'
import { extend, merge, omit, partial, pick, required } from './prototype'

export const ObjectSchema = function <T extends IObjectShape>(
    this: IObjectSchemaImpl<T>,
    shape: T
): void {
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
