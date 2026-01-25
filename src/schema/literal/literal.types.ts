import type { ILiteralSchema } from '../types'
import type { SchemaErrorCode } from '../constants'

export interface ILiteralSchemaImpl<T extends string | number | boolean> extends ILiteralSchema<T> {
    value: T
    _parse: (value: unknown, path: string[]) => T
    _refinements: Array<{
        check: (val: T) => boolean
        message: string
        code: SchemaErrorCode
    }>
    _isOptional: boolean
    _isNullable: boolean
    _defaultValue: T | undefined
    _transforms: Array<(val: unknown) => unknown>
}
