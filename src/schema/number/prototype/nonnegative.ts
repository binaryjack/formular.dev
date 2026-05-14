import { SchemaErrorCode } from '../../constants'
import type { INumberSchema } from '../../types'
import type { INumberSchemaImpl } from '../number.types'

export function nonnegative(this: INumberSchemaImpl, message?: string): INumberSchema {
    return this.refine((val) => val >= 0, {
        message: message ?? 'Number must be non-negative',
        code: SchemaErrorCode.InvalidNumber
    }) as INumberSchema
}
