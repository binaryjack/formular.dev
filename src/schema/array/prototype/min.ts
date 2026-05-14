import { DefaultErrorMessages, SchemaErrorCode } from '../../constants'
import type { IArraySchema } from '../../types'
import type { IArraySchemaImpl } from '../array.types'

export function min<T>(
    this: IArraySchemaImpl<T>,
    length: number,
    message?: string
): IArraySchema<T> {
    return this.refine((val) => val.length >= length, {
        message: message ?? DefaultErrorMessages.tooSmall(length, 'array'),
        code: SchemaErrorCode.TooSmall
    }) as IArraySchema<T>
}
