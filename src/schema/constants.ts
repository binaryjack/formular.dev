/**
 * Schema constants
 * Error codes and messages for schema validation
 */

export enum SchemaErrorCode {
    InvalidType = 'invalid_type',
    Required = 'required',
    TooSmall = 'too_small',
    TooBig = 'too_big',
    InvalidString = 'invalid_string',
    InvalidNumber = 'invalid_number',
    InvalidDate = 'invalid_date',
    InvalidEnum = 'invalid_enum',
    InvalidLiteral = 'invalid_literal',
    InvalidUnion = 'invalid_union',
    Custom = 'custom'
}

export enum StringValidationType {
    Email = 'email',
    Url = 'url',
    Regex = 'regex',
    Phone = 'phone',
    PostalCode = 'postal_code',
    AHV = 'ahv'
}

export enum NumberValidationType {
    Integer = 'integer',
    Positive = 'positive',
    Negative = 'negative',
    MultipleOf = 'multiple_of',
    Finite = 'finite',
    Safe = 'safe'
}

/**
 * Default error messages
 */
export const DefaultErrorMessages = {
    requiredField: 'This field is required',
    invalidType: (expected: string) => `Expected ${expected}`,
    tooSmall: (min: number, type: 'string' | 'number' | 'array') =>
        type === 'string'
            ? `String must contain at least ${min} character(s)`
            : type === 'array'
              ? `Array must contain at least ${min} element(s)`
              : `Number must be greater than or equal to ${min}`,
    tooBig: (max: number, type: 'string' | 'number' | 'array') =>
        type === 'string'
            ? `String must contain at most ${max} character(s)`
            : type === 'array'
              ? `Array must contain at most ${max} element(s)`
              : `Number must be less than or equal to ${max}`,
    invalidEmail: 'Invalid email address',
    invalidUrl: 'Invalid URL',
    invalidPattern: 'Invalid format',
    invalidEnum: (values: readonly string[]) => `Value must be one of: ${values.join(', ')}`,
    invalidLiteral: (value: string | number | boolean) => `Value must be ${value}`,
    invalidInteger: 'Must be an integer',
    invalidPositive: 'Must be positive',
    invalidNegative: 'Must be negative',
    invalidPhone: 'Invalid phone number',
    invalidPostalCode: 'Invalid postal code',
    invalidAHV: 'Invalid AHV number'
} as const
