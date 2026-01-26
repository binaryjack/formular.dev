import { SchemaBase } from '../base'
import { SchemaErrorCode } from '../constants'
import { createValidationError } from '../error'
import type { IEnumSchema } from '../types'
import type { IEnumSchemaImpl } from './enum.types'

export const EnumSchema = function <T extends readonly [string, ...string[]]>(
    this: IEnumSchemaImpl<T>,
    values: T
): void {
    this.values = values
    // @ts-expect-error - SchemaBase.call() pattern has unavoidable type conflict with generic constructors
    SchemaBase.call(this, (input: unknown, path: string[]) => {
        if (typeof input !== 'string' || !values.includes(input)) {
            throw new Error(
                createValidationError(
                    `Expected one of: ${values.join(', ')}`,
                    SchemaErrorCode.InvalidEnum,
                    path
                ).message
            )
        }
        return input as T[number]
    })
} as unknown as {
    new <T extends readonly [string, ...string[]]>(values: T): IEnumSchemaImpl<T>
    prototype: IEnumSchema<any>
}

EnumSchema.prototype = Object.create(SchemaBase.prototype)
EnumSchema.prototype.constructor = EnumSchema
