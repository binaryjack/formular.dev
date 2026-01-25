import { DefaultErrorMessages, SchemaErrorCode } from '../../constants'
import type { IStringSchema } from '../../types'
import type { IStringSchemaImpl } from '../string.types'

export function min(this: IStringSchemaImpl, length: number, message?: string): IStringSchema {
    return this.refine((val) => val.length >= length, {
        message: message ?? DefaultErrorMessages.tooSmall(length, 'string'),
        code: SchemaErrorCode.TooSmall
    }) as IStringSchema
}
