/**
 * String schema implementation
 * Comprehensive string validation including country-specific validators
 */

import { SchemaBase } from '../base'
import { createTypeError } from '../error'
import type { IStringSchema } from '../types'
import { ahv } from './prototype/ahv'
import { debounce } from './prototype/debounce'
import { email } from './prototype/email'
import { length } from './prototype/length'
import { max } from './prototype/max'
import { min } from './prototype/min'
import { nonempty } from './prototype/nonempty'
import { pattern } from './prototype/pattern'
import { phone } from './prototype/phone'
import { postalCode } from './prototype/postalCode'
import { toLowerCase } from './prototype/toLowerCase'
import { toUpperCase } from './prototype/toUpperCase'
import { trim } from './prototype/trim'
import { url } from './prototype/url'
import { IStringSchemaImpl } from './string.types'

/**
 * Email validation regex
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * URL validation regex
 */
export const URL_REGEX =
    /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)$/

/**
 * Phone number validators by country
 */
export const PHONE_VALIDATORS: Record<string, RegExp> = {
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
export const POSTAL_CODE_VALIDATORS: Record<string, RegExp> = {
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
export function validateAHV(value: string): boolean {
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
    // @ts-expect-error - SchemaBase.call() pattern has unavoidable type conflict with generic constructors
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

StringSchema.prototype = Object.create(SchemaBase.prototype)
StringSchema.prototype.constructor = StringSchema

Object.assign(StringSchema.prototype, {
    email,
    url,
    min,
    max,
    length,
    pattern,
    trim,
    toLowerCase,
    toUpperCase,
    nonempty,
    phone,
    postalCode,
    ahv,
    debounce
})
