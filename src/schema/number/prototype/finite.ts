import { SchemaErrorCode } from '../../constants'
import type { INumberSchema } from '../../types'
import type { INumberSchemaImpl } from '../number.types'

export function finite(this: INumberSchemaImpl, message?: string): INumberSchema {
    return this.refine((val) => Number.isFinite(val), {
        message: message ?? 'Number must be finite',
        code: SchemaErrorCode.InvalidNumber
    }) as INumberSchema
}
