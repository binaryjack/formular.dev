import type { IObjectSchema, IObjectShape } from '../../types'
import { ObjectSchema } from '../object'
import type { IObjectSchemaImpl } from '../object.types'

export function merge<T extends IObjectShape, U extends IObjectShape>(
    this: IObjectSchemaImpl<T>,
    schema: IObjectSchema<U>
): IObjectSchema<T & U> {
    const newShape = { ...this.shape, ...(schema as IObjectSchemaImpl<U>).shape }
    return new ObjectSchema(newShape as T & U)
}
