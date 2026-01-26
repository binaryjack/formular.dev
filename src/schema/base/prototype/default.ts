import type { ISchemaBase } from '../../types'
import type { ISchemaBaseImpl } from '../base.types'

export function defaultValue<TOutput, TInput>(
    this: ISchemaBaseImpl<TOutput, TInput>,
    value: TOutput
): ISchemaBase<TOutput, TInput> {
    const cloned = Object.create(Object.getPrototypeOf(this)) as ISchemaBaseImpl<TOutput, TInput>
    cloned._parse = this._parse
    cloned._refinements = [...this._refinements]
    cloned._isOptional = this._isOptional
    cloned._isNullable = this._isNullable
    cloned._defaultValue = value
    cloned._transforms = [...this._transforms]

    // Preserve _debounce property if set
    if ((this as any)._debounce !== undefined) {
        ;(cloned as any)._debounce = (this as any)._debounce
    }

    return cloned
}
