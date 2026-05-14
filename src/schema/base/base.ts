/**
 * Base schema constructor
 * Foundation for all schema types
 */

import type { ISchemaBaseImpl } from './base.types'
import { defaultValue, nullable, optional, parse, refine, safeParse, transform } from './prototype'

export const SchemaBase = function <TOutput, TInput = TOutput>(
    this: ISchemaBaseImpl<TOutput, TInput>,
    _parse: (value: TInput, path: string[]) => TOutput
): void {
    this._parse = _parse
    this._refinements = []
    this._isOptional = false
    this._isNullable = false
    this._defaultValue = undefined
    this._transforms = []
} as unknown as {
    new <TOutput, TInput = TOutput>(
        _parse: (value: TInput, path: string[]) => TOutput
    ): ISchemaBaseImpl<TOutput, TInput>
    prototype: any
}

Object.assign(SchemaBase.prototype, {
    default: defaultValue,
    nullable,
    optional,
    parse,
    refine,
    safeParse,
    transform
})
