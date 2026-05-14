import type { SchemaErrorCode } from '../constants'
import type { ISchemaBase, IUnionSchema } from '../types'

export interface IUnionSchemaImpl<T extends readonly ISchemaBase[]> extends IUnionSchema<T> {
    options: T
    _parse: (value: unknown, path: string[]) => T[number]['_output']
    _refinements: Array<{
        check: (val: T[number]['_output']) => boolean
        message: string
        code: SchemaErrorCode
    }>
    _isOptional: boolean
    _isNullable: boolean
    _defaultValue: T[number]['_output'] | undefined
    _transforms: Array<(val: unknown) => unknown>
}
