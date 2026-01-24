/**
 * Schema system main export
 * Zero-dependency schema validation for formular.dev
 */

// Core types
export type * from './types'

// Builder API
export { f, type infer } from './builder'

// Preset registry
export { presetRegistry, ValidatorPresetRegistry } from './presets'

// Error handling
export { createTypeError, createValidationError, SchemaValidationError } from './error'

// Constants
export {
    DefaultErrorMessages,
    NumberValidationType,
    SchemaErrorCode,
    StringValidationType
} from './constants'

// Individual schema classes (for advanced use)
export { ArraySchema } from './array'
export { RecordSchema, UnionSchema } from './complex'
export { NumberSchema } from './number'
export { ObjectSchema } from './object'
export { BooleanSchema, DateSchema, EnumSchema, LiteralSchema } from './primitives'
export { StringSchema } from './string'
