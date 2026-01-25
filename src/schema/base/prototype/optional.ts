import type { ISchemaBase } from '../../types'
import type { IRefinement, ISchemaBaseImpl } from '../base.types'

export function optional<TOutput, TInput>(
    this: ISchemaBaseImpl<TOutput, TInput>
): ISchemaBase<TOutput | undefined, TInput | undefined> {
    const cloned = Object.create(Object.getPrototypeOf(this)) as ISchemaBaseImpl<
        TOutput | undefined,
        TInput | undefined
    >
    // Type widening: the parser can now accept undefined inputs
    cloned._parse = this._parse as unknown as (
        value: TInput | undefined,
        path: string[]
    ) => TOutput | undefined
    cloned._refinements = [...this._refinements] as unknown as IRefinement<TOutput | undefined>[]
    cloned._isOptional = true
    cloned._isNullable = this._isNullable
    cloned._defaultValue = this._defaultValue
    cloned._transforms = [...this._transforms]
    return cloned
}
