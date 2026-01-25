import { SchemaErrorCode } from '../../constants'
import type { INumberSchema } from '../../types'
import type { INumberSchemaImpl } from '../number.types'

export function multipleOf(
    this: INumberSchemaImpl,
    value: number,
    message?: string
): INumberSchema {
    return this.refine((val) => val % value === 0, {
        message: message ?? `Number must be a multiple of ${value}`,
        code: SchemaErrorCode.InvalidNumber
    }) as INumberSchema
}
