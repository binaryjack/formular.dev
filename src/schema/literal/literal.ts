import { SchemaBase } from '../base'
import { SchemaErrorCode } from '../constants'
import { createValidationError } from '../error'
import type { ILiteralSchema } from '../types'
import type { ILiteralSchemaImpl } from './literal.types'

export const LiteralSchema = function <T extends string | number | boolean>(
    this: ILiteralSchemaImpl<T>,
    value: T
): void {
    this.value = value
    // @ts-expect-error - SchemaBase.call() pattern has unavoidable type conflict with generic constructors
    SchemaBase.call(this, (input: unknown, path: string[]) => {
        if (input !== value) {
            throw new Error(
                createValidationError(
                    `Expected literal ${value}`,
                    SchemaErrorCode.InvalidLiteral,
                    path
                ).message
            )
        }
        return value
    })
} as unknown as {
    new <T extends string | number | boolean>(value: T): ILiteralSchemaImpl<T>
    prototype: ILiteralSchema<any>
}
