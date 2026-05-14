import { SchemaErrorCode } from '../../constants'
import type { IArraySchema } from '../../types'
import type { IArraySchemaImpl } from '../array.types'

export function nonempty<T>(this: IArraySchemaImpl<T>, message?: string): IArraySchema<T> {
    return this.refine((val) => val.length > 0, {
        message: message ?? 'Array cannot be empty',
        code: SchemaErrorCode.Required
    }) as IArraySchema<T>
}
