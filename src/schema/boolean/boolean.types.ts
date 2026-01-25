import type { SchemaErrorCode } from '../constants'
import type { IBooleanSchema } from '../types'

export interface IBooleanSchemaImpl extends IBooleanSchema {
    _parse: (value: unknown, path: string[]) => boolean
    _refinements: Array<{
        check: (val: boolean) => boolean
        message: string
        code: SchemaErrorCode
    }>
    _isOptional: boolean
    _isNullable: boolean
    _defaultValue: boolean | undefined
    _transforms: Array<(val: unknown) => unknown>
}
