import { DefaultErrorMessages, SchemaErrorCode } from '../../constants'
import type { IArraySchema } from '../../types'
import type { IArraySchemaImpl } from '../array.types'

export function max<T>(
    this: IArraySchemaImpl<T>,
    length: number,
    message?: string
): IArraySchema<T> {
    return this.refine((val) => val.length <= length, {
        message: message ?? DefaultErrorMessages.tooBig(length, 'array'),
        code: SchemaErrorCode.TooBig
    }) as IArraySchema<T>
}
