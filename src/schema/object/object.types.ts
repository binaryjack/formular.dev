import type { SchemaErrorCode } from '../constants'
import type { IObjectSchema, IObjectShape } from '../types'

export interface IObjectSchemaImpl<T extends IObjectShape> extends IObjectSchema<T> {
    shape: T
    _refinements: Array<{
        check: (val: Record<string, any>) => boolean
        message: string
        code: SchemaErrorCode
    }>
}
