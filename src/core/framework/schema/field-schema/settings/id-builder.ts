import { FieldSchemaBuilder } from '@core/framework/schema/field-schema/field.schema.builder'

export const IdBuilder = new FieldSchemaBuilder(1, 'id').setTypeData('text').setDefaultValue(23)
