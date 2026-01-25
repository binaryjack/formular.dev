import { DefaultErrorMessages, SchemaErrorCode } from '../../constants'
import type { INumberSchema } from '../../types'
import type { INumberSchemaImpl } from '../number.types'

export function int(this: INumberSchemaImpl, message?: string): INumberSchema {
    return this.refine((val) => Number.isInteger(val), {
        message: message ?? DefaultErrorMessages.invalidInteger,
        code: SchemaErrorCode.InvalidNumber
    }) as INumberSchema
}
