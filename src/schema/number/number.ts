/**
 * Number schema implementation
 */

import { SchemaBase } from '../base'
import { createTypeError } from '../error'
import type { INumberSchema } from '../types'
import { INumberSchemaImpl } from './number.types'
import { debounce } from './prototype/debounce'
import { finite } from './prototype/finite'
import { int } from './prototype/int'
import { max } from './prototype/max'
import { min } from './prototype/min'
import { multipleOf } from './prototype/multipleOf'
import { negative } from './prototype/negative'
import { nonnegative } from './prototype/nonnegative'
import { nonpositive } from './prototype/nonpositive'
import { positive } from './prototype/positive'
import { safe } from './prototype/safe'

export const NumberSchema = function (this: INumberSchemaImpl): void {
    // @ts-expect-error - SchemaBase.call() pattern has unavoidable type conflict with generic constructors
    SchemaBase.call(this, (value: unknown, path: string[]) => {
        if (typeof value === 'string' && !isNaN(Number(value))) {
            return Number(value)
        }
        if (typeof value !== 'number') {
            throw new Error(createTypeError('number', path).message)
        }
        if (isNaN(value)) {
            throw new Error('Value is NaN')
        }
        return value
    })
} as unknown as {
    new (): INumberSchemaImpl
    prototype: INumberSchema
}

NumberSchema.prototype = Object.create(SchemaBase.prototype)
NumberSchema.prototype.constructor = NumberSchema

Object.assign(NumberSchema.prototype, {
    min,
    max,
    int,
    positive,
    negative,
    nonpositive,
    nonnegative,
    multipleOf,
    finite,
    safe,
    debounce
})
