import { IFieldSchema, IFieldSchemaBuilder } from '../field-schema-types'

export function clone(this: IFieldSchemaBuilder) {
    const tempInstance = { ...this } as IFieldSchema
    return Object.assign(Object.create(Object.getPrototypeOf(this)), tempInstance) as IFieldSchema
}
