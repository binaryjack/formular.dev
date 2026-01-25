import type { SchemaErrorCode } from '../constants'
import type { IEnumSchema } from '../types'

export interface IEnumSchemaImpl<T extends readonly [string, ...string[]]> extends IEnumSchema<T> {
    values: T
    _parse: (value: unknown, path: string[]) => T[number]
    _refinements: Array<{
        check: (val: T[number]) => boolean
        message: string
        code: SchemaErrorCode
    }>
    _isOptional: boolean
    _isNullable: boolean
    _defaultValue: T[number] | undefined
    _transforms: Array<(val: unknown) => unknown>
}
