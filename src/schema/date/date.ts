import { SchemaBase } from '../base'
import { createTypeError } from '../error'
import type { IDateSchema } from '../types'
import type { IDateSchemaImpl } from './date.types'
import { min } from './prototype/min'
import { max } from './prototype/max'

export const DateSchema = function (this: IDateSchemaImpl): void {
    // @ts-expect-error - SchemaBase.call() pattern has unavoidable type conflict with generic constructors
    SchemaBase.call(this, (value: unknown, path: string[]) => {
        if (value instanceof Date) {
            if (isNaN(value.getTime())) {
                throw new Error(createTypeError('valid date', path).message)
            }
            return value
        }

        if (typeof value === 'string' || typeof value === 'number') {
            const date = new Date(value)
            if (isNaN(date.getTime())) {
                throw new Error(createTypeError('valid date', path).message)
            }
            return date
        }

        throw new Error(createTypeError('date', path).message)
    })
} as unknown as {
    new (): IDateSchemaImpl
    prototype: IDateSchema
}

Object.assign(DateSchema.prototype, {
    min,
    max
})
