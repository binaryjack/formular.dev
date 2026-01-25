import type { ISchemaBase } from '../../types'
import type { IRefinement, ISchemaBaseImpl } from '../base.types'

export function nullable<TOutput, TInput>(
    this: ISchemaBaseImpl<TOutput, TInput>
): ISchemaBase<TOutput | null, TInput | null> {
    const cloned = Object.create(Object.getPrototypeOf(this)) as ISchemaBaseImpl<
        TOutput | null,
        TInput | null
    >
    // Type widening: the parser can now accept null inputs
    cloned._parse = this._parse as unknown as (
        value: TInput | null,
        path: string[]
    ) => TOutput | null
    cloned._refinements = [...this._refinements] as unknown as IRefinement<TOutput | null>[]
    cloned._isOptional = this._isOptional
    cloned._isNullable = true
    cloned._defaultValue = this._defaultValue
    cloned._transforms = [...this._transforms]
    return cloned
}
