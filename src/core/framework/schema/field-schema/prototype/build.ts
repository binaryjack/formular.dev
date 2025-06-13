import { IFieldSchema, IFieldSchemaBuilder } from '../field-schema-types'

export function build(this: IFieldSchemaBuilder) {
    return {
        ...this
    } as IFieldSchema
}
