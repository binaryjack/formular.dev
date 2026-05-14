import type { SchemaErrorCode } from '../constants'
import type { IRefinementFn, ISchemaBase, ITransformFn } from '../types'

export interface IRefinement<T> {
    check: IRefinementFn<T>
    message: string
    code: SchemaErrorCode
}

export interface ISchemaBaseImpl<TOutput, TInput = TOutput> extends ISchemaBase<TOutput, TInput> {
    _parse: (value: TInput, path: string[]) => TOutput
    _refinements: IRefinement<TOutput>[]
    _isOptional: boolean
    _isNullable: boolean
    _defaultValue: TOutput | undefined
    _transforms: ITransformFn<unknown, unknown>[]
}
