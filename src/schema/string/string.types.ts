import { SchemaErrorCode } from '../constants'
import type { IStringSchema } from '../types'

export interface IStringSchemaImpl extends IStringSchema {
    _parse: (value: unknown, path: string[]) => string
    _refinements: Array<{
        check: (val: string) => boolean
        message: string
        code: SchemaErrorCode
    }>
    _isOptional: boolean
    _isNullable: boolean
    _defaultValue: string | undefined
    _transforms: Array<(val: unknown) => unknown>
}
