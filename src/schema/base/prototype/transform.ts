import type { ISchemaBase, ITransformFn } from '../../types'
import type { ISchemaBaseImpl } from '../base.types'

export function transform<TOutput, TInput, TNewOutput>(
    this: ISchemaBaseImpl<TOutput, TInput>,
    fn: ITransformFn<TOutput, TNewOutput>
): ISchemaBase<TNewOutput, TInput> {
    const cloned = Object.create(Object.getPrototypeOf(this)) as ISchemaBaseImpl<TNewOutput, TInput>
    cloned._parse = this._parse as unknown as (value: TInput, path: string[]) => TNewOutput
    cloned._refinements = []
    cloned._isOptional = this._isOptional
    cloned._isNullable = this._isNullable
    cloned._defaultValue = undefined
    cloned._transforms = [...this._transforms, fn as ITransformFn<unknown, unknown>]
    return cloned
}
