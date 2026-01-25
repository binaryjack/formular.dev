import { DefaultErrorMessages, SchemaErrorCode } from '../../constants'
import type { IStringSchema } from '../../types'
import { POSTAL_CODE_VALIDATORS } from '../string'
import type { IStringSchemaImpl } from '../string.types'

export function postalCode(
    this: IStringSchemaImpl,
    countryCode: string,
    message?: string
): IStringSchema {
    const validator = POSTAL_CODE_VALIDATORS[countryCode.toUpperCase()]
    if (!validator) {
        throw new Error(`Unsupported country code for postal code validation: ${countryCode}`)
    }

    return this.refine((val) => validator.test(val), {
        message: message ?? DefaultErrorMessages.invalidPostalCode,
        code: SchemaErrorCode.InvalidString
    }) as IStringSchema
}
