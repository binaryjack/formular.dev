import type { SchemaErrorCode } from '../constants'
import type { IDateSchema } from '../types'

export interface IDateSchemaImpl extends IDateSchema {
    _parse: (value: unknown, path: string[]) => Date
    _refinements: Array<{
        check: (val: Date) => boolean
        message: string
        code: SchemaErrorCode
    }>
    _isOptional: boolean
    _isNullable: boolean
    _defaultValue: Date | undefined
    _transforms: Array<(val: unknown) => unknown>
}
