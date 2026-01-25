import { SchemaErrorCode } from '../../constants'
import type { IStringSchema } from '../../types'
import type { IStringSchemaImpl } from '../string.types'

export function length(this: IStringSchemaImpl, length: number, message?: string): IStringSchema {
    return this.refine((val) => val.length === length, {
        message: message ?? `String must be exactly ${length} character(s)`,
        code: SchemaErrorCode.InvalidString
    }) as IStringSchema
}
