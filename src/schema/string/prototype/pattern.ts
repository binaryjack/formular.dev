import { DefaultErrorMessages, SchemaErrorCode } from '../../constants'
import type { IStringSchema } from '../../types'
import type { IStringSchemaImpl } from '../string.types'

export function pattern(this: IStringSchemaImpl, regex: RegExp, message?: string): IStringSchema {
    return this.refine((val) => regex.test(val), {
        message: message ?? DefaultErrorMessages.invalidPattern,
        code: SchemaErrorCode.InvalidString
    }) as IStringSchema
}
