import { SchemaErrorCode } from '../../constants'
import type { IRefinementFn, IRefinementOptions, ISchemaBase } from '../../types'
import type { ISchemaBaseImpl } from '../base.types'

export function refine<TOutput, TInput>(
    this: ISchemaBaseImpl<TOutput, TInput>,
    check: IRefinementFn<TOutput>,
    options: IRefinementOptions = {}
): ISchemaBase<TOutput, TInput> {
    const cloned = Object.create(Object.getPrototypeOf(this)) as ISchemaBaseImpl<TOutput, TInput>
    cloned._parse = this._parse
    cloned._refinements = [
        ...this._refinements,
        {
            check,
            message: options.message ?? 'Validation failed',
            code: options.code ?? SchemaErrorCode.Custom
        }
    ]
    cloned._isOptional = this._isOptional
    cloned._isNullable = this._isNullable
    cloned._defaultValue = this._defaultValue
    cloned._transforms = [...this._transforms]
    return cloned
}
