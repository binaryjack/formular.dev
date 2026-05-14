import { SchemaErrorCode } from '../../constants'
import type { INumberSchema } from '../../types'
import type { INumberSchemaImpl } from '../number.types'

export function safe(this: INumberSchemaImpl, message?: string): INumberSchema {
    return this.refine((val) => Number.isSafeInteger(val), {
        message: message ?? 'Number must be a safe integer',
        code: SchemaErrorCode.InvalidNumber
    }) as INumberSchema
}
