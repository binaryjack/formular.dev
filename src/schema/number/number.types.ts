import { SchemaErrorCode } from '../constants'
import type { INumberSchema } from '../types'

export interface INumberSchemaImpl extends INumberSchema {
    _parse: (value: unknown, path: string[]) => number
    _refinements: Array<{
        check: (val: number) => boolean
        message: string
        code: SchemaErrorCode
    }>
    _isOptional: boolean
    _isNullable: boolean
    _defaultValue: number | undefined
    _transforms: Array<(val: unknown) => unknown>
    _debounce: number | undefined
}
