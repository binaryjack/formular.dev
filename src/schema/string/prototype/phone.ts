import { DefaultErrorMessages, SchemaErrorCode } from '../../constants'
import type { IStringSchema } from '../../types'
import { PHONE_VALIDATORS } from '../string'
import type { IStringSchemaImpl } from '../string.types'

export function phone(
    this: IStringSchemaImpl,
    countryCode: string,
    message?: string
): IStringSchema {
    const validator = PHONE_VALIDATORS[countryCode.toUpperCase()]
    if (!validator) {
        throw new Error(`Unsupported country code for phone validation: ${countryCode}`)
    }

    return this.refine((val) => validator.test(val), {
        message: message ?? DefaultErrorMessages.invalidPhone,
        code: SchemaErrorCode.InvalidString
    }) as IStringSchema
}
