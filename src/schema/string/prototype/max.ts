import { DefaultErrorMessages, SchemaErrorCode } from '../../constants'
import type { IStringSchema } from '../../types'
import type { IStringSchemaImpl } from '../string.types'

export function max(this: IStringSchemaImpl, length: number, message?: string): IStringSchema {
    const cloned = this.refine((val) => val.length <= length, {
        message: message ?? DefaultErrorMessages.tooBig(length, 'string'),
        code: SchemaErrorCode.TooBig
    }) as IStringSchemaImpl
    cloned._max = {
        value: length,
        message: message ?? DefaultErrorMessages.tooBig(length, 'string')
    }
    return cloned as IStringSchema
}
