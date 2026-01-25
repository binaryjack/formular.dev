import type { IObjectSchema, IObjectShape } from '../../types'
import { ObjectSchema } from '../object'
import type { IObjectSchemaImpl } from '../object.types'

export function required<T extends IObjectShape>(this: IObjectSchemaImpl<T>): IObjectSchema<T> {
    return new ObjectSchema(this.shape)
}
