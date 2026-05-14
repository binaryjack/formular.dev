import type { IObjectSchema, IObjectShape, ISchemaBase } from '../../types'
import { ObjectSchema } from '../object'
import type { IObjectSchemaImpl } from '../object.types'

export function omit<T extends IObjectShape, K extends keyof T>(
    this: IObjectSchemaImpl<T>,
    keys: K[]
): IObjectSchema<Omit<T, K>> {
    const newShape: Record<string, ISchemaBase<any>> = {}
    const omitSet = new Set(keys)

    for (const key in this.shape) {
        if (
            Object.prototype.hasOwnProperty.call(this.shape, key) &&
            !omitSet.has(key as unknown as K)
        ) {
            newShape[key] = this.shape[key]
        }
    }

    return new ObjectSchema(newShape as Omit<T, K>)
}
