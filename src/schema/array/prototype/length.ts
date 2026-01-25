import { SchemaErrorCode } from '../../constants'
import type { IArraySchema } from '../../types'
import type { IArraySchemaImpl } from '../array.types'

export function length<T>(
    this: IArraySchemaImpl<T>,
    length: number,
    message?: string
): IArraySchema<T> {
    return this.refine((val) => val.length === length, {
        message: message ?? `Array must contain exactly ${length} element(s)`,
        code: SchemaErrorCode.InvalidType
    }) as IArraySchema<T>
}
