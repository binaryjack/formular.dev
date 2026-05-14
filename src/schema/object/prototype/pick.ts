import type { IObjectSchema, IObjectShape, ISchemaBase } from '../../types'
import { ObjectSchema } from '../object'
import type { IObjectSchemaImpl } from '../object.types'

export function pick<T extends IObjectShape, K extends keyof T>(
    this: IObjectSchemaImpl<T>,
    keys: K[]
): IObjectSchema<Pick<T, K>> {
    const newShape: Record<string, ISchemaBase<any>> = {}

    for (const key of keys) {
        if (Object.prototype.hasOwnProperty.call(this.shape, key)) {
            newShape[key as string] = this.shape[key]
        }
    }

    return new ObjectSchema(newShape as Pick<T, K>)
}
