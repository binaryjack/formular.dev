import { DefaultErrorMessages, SchemaErrorCode } from '../../constants'
import type { IStringSchema } from '../../types'
import { EMAIL_REGEX } from '../string'
import type { IStringSchemaImpl } from '../string.types'

export function email(this: IStringSchemaImpl, message?: string): IStringSchema {
    return this.refine((val) => EMAIL_REGEX.test(val), {
        message: message ?? DefaultErrorMessages.invalidEmail,
        code: SchemaErrorCode.InvalidString
    }) as IStringSchema
}
