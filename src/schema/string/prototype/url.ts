import { DefaultErrorMessages, SchemaErrorCode } from '../../constants'
import type { IStringSchema } from '../../types'
import { URL_REGEX } from '../string'
import type { IStringSchemaImpl } from '../string.types'

export function url(this: IStringSchemaImpl, message?: string): IStringSchema {
    return this.refine((val) => URL_REGEX.test(val), {
        message: message ?? DefaultErrorMessages.invalidUrl,
        code: SchemaErrorCode.InvalidString
    }) as IStringSchema
}
