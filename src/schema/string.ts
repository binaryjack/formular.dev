/**
 * String schema implementation
 * Comprehensive string validation including country-specific validators
 */

import { SchemaBase } from './base'
import { DefaultErrorMessages, SchemaErrorCode } from './constants'
import { createTypeError } from './error'
import type { IStringSchema } from './types'

/**
 * Email validation regex
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * URL validation regex
 */
const URL_REGEX =
    /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)$/

/**
 * Phone number validators by country
 */
const PHONE_VALIDATORS: Record<string, RegExp> = {
    CH: /^(\+41|0041|0)[1-9]\d{8}$/,
    US: /^(\+1|001|1)?[2-9]\d{9}$/,
    UK: /^(\+44|0044|0)[1-9]\d{9,10}$/,
    FR: /^(\+33|0033|0)[1-9]\d{8}$/,
    DE: /^(\+49|0049|0)[1-9]\d{9,11}$/,
    IT: /^(\+39|0039|0)?[0-9]{9,10}$/,
    ES: /^(\+34|0034)?[6-9]\d{8}$/,
    CA: /^(\+1|001|1)?[2-9]\d{9}$/,
    AU: /^(\+61|0061|0)[2-478]\d{8}$/,
    JP: /^(\+81|0081|0)[1-9]\d{9}$/
}

/**
 * Postal code validators by country
 */
const POSTAL_CODE_VALIDATORS: Record<string, RegExp> = {
    CH: /^[1-9]\d{3}$/,
    US: /^\d{5}(-\d{4})?$/,
    UK: /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i,
    FR: /^\d{5}$/,
    DE: /^\d{5}$/,
    IT: /^\d{5}$/,
    ES: /^\d{5}$/,
    CA: /^[A-Z]\d[A-Z] ?\d[A-Z]\d$/i,
    AU: /^\d{4}$/,
    JP: /^\d{3}-?\d{4}$/
}

/**
 * Swiss AHV (social security) validation
 */
const AHV_REGEX = /^756\.\d{4}\.\d{4}\.\d{2}$/

/**
 * Validate Swiss AHV number with checksum
 */
function validateAHV(value: string): boolean {
    if (!AHV_REGEX.test(value)) {
        return false
    }

    // Remove dots for checksum calculation
    const digits = value.replace(/\./g, '').split('').map(Number)

    // EAN-13 checksum algorithm
    let sum = 0
    for (let i = 0; i < digits.length - 1; i++) {
        sum += digits[i] * (i % 2 === 0 ? 1 : 3)
    }

    const checksum = (10 - (sum % 10)) % 10
    return checksum === digits[digits.length - 1]
}

export const StringSchema = function (this: IStringSchemaImpl): void {
    SchemaBase.call(this, (value: unknown, path: string[]) => {
        if (typeof value !== 'string') {
            throw new Error(createTypeError('string', path).message)
        }
        return value
    })
} as unknown as {
    new (): IStringSchemaImpl
    prototype: IStringSchema
}

interface IStringSchemaImpl extends IStringSchema {
    _parse: (value: unknown, path: string[]) => string
    _refinements: Array<{
        check: (val: string) => boolean
        message: string
        code: string
    }>
    _isOptional: boolean
    _isNullable: boolean
    _defaultValue: string | undefined
    _transforms: Array<(val: unknown) => unknown>
}

StringSchema.prototype = Object.create(SchemaBase.prototype)
StringSchema.prototype.constructor = StringSchema

StringSchema.prototype.email = function (this: IStringSchemaImpl, message?: string): IStringSchema {
    return this.refine((val) => EMAIL_REGEX.test(val), {
        message: message ?? DefaultErrorMessages.invalidEmail,
        code: SchemaErrorCode.InvalidString
    }) as IStringSchema
}

StringSchema.prototype.url = function (this: IStringSchemaImpl, message?: string): IStringSchema {
    return this.refine((val) => URL_REGEX.test(val), {
        message: message ?? DefaultErrorMessages.invalidUrl,
        code: SchemaErrorCode.InvalidString
    }) as IStringSchema
}

StringSchema.prototype.min = function (
    this: IStringSchemaImpl,
    length: number,
    message?: string
): IStringSchema {
    return this.refine((val) => val.length >= length, {
        message: message ?? DefaultErrorMessages.tooSmall(length, 'string'),
        code: SchemaErrorCode.TooSmall
    }) as IStringSchema
}

StringSchema.prototype.max = function (
    this: IStringSchemaImpl,
    length: number,
    message?: string
): IStringSchema {
    return this.refine((val) => val.length <= length, {
        message: message ?? DefaultErrorMessages.tooBig(length, 'string'),
        code: SchemaErrorCode.TooBig
    }) as IStringSchema
}

StringSchema.prototype.length = function (
    this: IStringSchemaImpl,
    length: number,
    message?: string
): IStringSchema {
    return this.refine((val) => val.length === length, {
        message: message ?? `String must be exactly ${length} character(s)`,
        code: SchemaErrorCode.InvalidString
    }) as IStringSchema
}

StringSchema.prototype.pattern = function (
    this: IStringSchemaImpl,
    regex: RegExp,
    message?: string
): IStringSchema {
    return this.refine((val) => regex.test(val), {
        message: message ?? DefaultErrorMessages.invalidPattern,
        code: SchemaErrorCode.InvalidString
    }) as IStringSchema
}

StringSchema.prototype.trim = function (this: IStringSchemaImpl): IStringSchema {
    return this.transform((val) => (val as string).trim()) as IStringSchema
}

StringSchema.prototype.toLowerCase = function (this: IStringSchemaImpl): IStringSchema {
    return this.transform((val) => (val as string).toLowerCase()) as IStringSchema
}

StringSchema.prototype.toUpperCase = function (this: IStringSchemaImpl): IStringSchema {
    return this.transform((val) => (val as string).toUpperCase()) as IStringSchema
}

StringSchema.prototype.nonempty = function (
    this: IStringSchemaImpl,
    message?: string
): IStringSchema {
    return this.refine((val) => val.length > 0, {
        message: message ?? DefaultErrorMessages.requiredField,
        code: SchemaErrorCode.Required
    }) as IStringSchema
}

StringSchema.prototype.phone = function (
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

StringSchema.prototype.postalCode = function (
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

StringSchema.prototype.ahv = function (this: IStringSchemaImpl, message?: string): IStringSchema {
    return this.refine((val) => validateAHV(val), {
        message: message ?? DefaultErrorMessages.invalidAHV,
        code: SchemaErrorCode.InvalidString
    }) as IStringSchema
}
