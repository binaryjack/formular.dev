import type { IInferShape, IObjectSchema, IObjectShape, ISchemaBase } from '../../types'
import { ObjectSchema } from '../object'
import type { IObjectSchemaImpl } from '../object.types'

export function partial<T extends IObjectShape>(
    this: IObjectSchemaImpl<T>
): IObjectSchema<{ [K in keyof T]: ISchemaBase<IInferShape<T>[K] | undefined> }> {
    const newShape: Record<string, ISchemaBase> = {}

    for (const key in this.shape) {
        if (Object.prototype.hasOwnProperty.call(this.shape, key)) {
            newShape[key] = this.shape[key].optional()
        }
    }

    return new ObjectSchema(
        newShape as { [K in keyof T]: ISchemaBase<IInferShape<T>[K] | undefined> }
    )
}
