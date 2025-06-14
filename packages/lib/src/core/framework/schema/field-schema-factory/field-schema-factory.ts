import { IFieldSchemeFactory } from './field-schema-factory.types'
import { addBuilders } from './prototype/add-builders'
import { create } from './prototype/create'

/**
 * FieldSchemaFactory is a factory for managing and creating field schemas using registered builders.
 *
 * Usage:
 *   - Register builders using addBuilders.
 *   - Create field schemas using the create method.
 */
export const FieldSchemaFactory = function (this: IFieldSchemeFactory) {
    this.builders = []
} as any as IFieldSchemeFactory

Object.assign(FieldSchemaFactory.prototype, {
    addBuilders,
    create
})
