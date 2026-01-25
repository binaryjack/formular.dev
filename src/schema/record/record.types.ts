import type { IRecordSchema, ISchemaBase } from '../types'
import type { SchemaErrorCode } from '../constants'

export interface IRecordSchemaImpl<K extends string | number, V> extends IRecordSchema<K, V> {
    keySchema: ISchemaBase<K>
    valueSchema: ISchemaBase<V>
    _parse: (value: unknown, path: string[]) => Record<K, V>
    _refinements: Array<{
        check: (val: Record<K, V>) => boolean
        message: string
        code: SchemaErrorCode
    }>
    _isOptional: boolean
    _isNullable: boolean
    _defaultValue: Record<K, V> | undefined
    _transforms: Array<(val: unknown) => unknown>
}
