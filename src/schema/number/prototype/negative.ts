import { DefaultErrorMessages, SchemaErrorCode } from '../../constants'
import type { INumberSchema } from '../../types'
import type { INumberSchemaImpl } from '../number.types'

export function negative(this: INumberSchemaImpl, message?: string): INumberSchema {
    return this.refine((val) => val < 0, {
        message: message ?? DefaultErrorMessages.invalidNegative,
        code: SchemaErrorCode.InvalidNumber
    }) as INumberSchema
}
