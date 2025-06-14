import { IFieldSchemaBuilder } from '../../field-schema/field-schema-types'
import { IFieldSchemeFactory } from '../field-schema-factory.types'

/**
 * Adds field schema builders to the factory.
 * @param builders Array of field schema builders to add.
 */
export function addBuilders(this: IFieldSchemeFactory, ...builders: IFieldSchemaBuilder[]) {
    this.builders = [...builders]
}
