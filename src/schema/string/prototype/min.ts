import { DefaultErrorMessages, SchemaErrorCode } from '../../constants'
import type { IStringSchema } from '../../types'
import type { IStringSchemaImpl } from '../string.types'

export function min(this: IStringSchemaImpl, length: number, message?: string): IStringSchema {
    const cloned = this.refine((val) => val.length >= length, {
        message: message ?? DefaultErrorMessages.tooSmall(length, 'string'),
        code: SchemaErrorCode.TooSmall
    }) as IStringSchemaImpl
    cloned._min = {
        value: length,
        message: message ?? DefaultErrorMessages.tooSmall(length, 'string')
    }
    return cloned as IStringSchema
}
