/**
 * Array schema implementation
 */

import { SchemaBase } from '../base'
import { createTypeError } from '../error'
import type { IArraySchema, ISchemaBase } from '../types'
import { IArraySchemaImpl } from './array.types'
import { length } from './prototype/length'
import { max } from './prototype/max'
import { min } from './prototype/min'
import { nonempty } from './prototype/nonempty'

export const ArraySchema = function <T>(this: IArraySchemaImpl<T>, element: ISchemaBase<T>): void {
    this.element = element
    // @ts-expect-error - SchemaBase.call() pattern has unavoidable type conflict with generic constructors
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

ArraySchema.prototype = Object.create(SchemaBase.prototype)
ArraySchema.prototype.constructor = ArraySchema

Object.assign(ArraySchema.prototype, {
    min,
    max,
    length,
    nonempty
})
