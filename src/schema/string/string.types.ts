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
    _debounce: number | undefined
    /** Named constraints — set by prototype methods for schemaToDescriptors bridging */
    _min?: { value: number; message: string }
    _max?: { value: number; message: string }
    _required?: { value: boolean; message: string }
    _email?: { value: RegExp; message: string }
}
