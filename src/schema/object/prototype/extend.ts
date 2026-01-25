import type { IObjectSchema, IObjectShape } from '../../types'
import { ObjectSchema } from '../object'
import type { IObjectSchemaImpl } from '../object.types'

export function extend<T extends IObjectShape, U extends IObjectShape>(
    this: IObjectSchemaImpl<T>,
    schema: U
): IObjectSchema<T & U> {
    const newShape = { ...this.shape, ...schema }
    return new ObjectSchema(newShape as T & U)
}
