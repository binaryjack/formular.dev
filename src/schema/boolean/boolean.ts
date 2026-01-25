import { SchemaBase } from '../base'
import { createTypeError } from '../error'
import type { IBooleanSchema } from '../types'
import type { IBooleanSchemaImpl } from './boolean.types'
import { trueMethod } from './prototype/true'
import { falseMethod } from './prototype/false'

export const BooleanSchema = function (this: IBooleanSchemaImpl): void {
    // @ts-expect-error - SchemaBase.call() pattern has unavoidable type conflict with generic constructors
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

Object.assign(BooleanSchema.prototype, {
    true: trueMethod,
    false: falseMethod
})
