import { SchemaErrorCode } from '../constants'
import type { IArraySchema, ISchemaBase } from '../types'

export interface IArraySchemaImpl<T> extends IArraySchema<T> {
    element: ISchemaBase<T>
    _parse: (value: unknown, path: string[]) => T[]
    _refinements: Array<{
        check: (val: T[]) => boolean
        message: string
        code: SchemaErrorCode
    }>
    _isOptional: boolean
    _isNullable: boolean
    _defaultValue: T[] | undefined
    _transforms: Array<(val: unknown) => unknown>
}
