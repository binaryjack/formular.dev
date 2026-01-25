import type { IObjectSchema, IObjectShape } from '../types'
import type { IObjectSchemaImpl } from './object.types'
import { extend, merge, omit, partial, pick, required } from './prototype'

export const ObjectSchema = function <T extends IObjectShape>(
    this: IObjectSchemaImpl<T>,
    shape: T
): void {
    this.shape = shape
    this._refinements = []
} as unknown as {
    new <T extends IObjectShape>(shape: T): IObjectSchema<T>
    prototype: any
}

Object.assign(ObjectSchema.prototype, {
    partial,
    required,
    pick,
    omit,
    extend,
    merge
})
