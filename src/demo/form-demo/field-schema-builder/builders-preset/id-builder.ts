import { FieldSchemaBuilder } from '@core/framework/schema/field-schema/field.schema.builder'

export const IdBuilder = new FieldSchemaBuilder().setTypeInput('number').setDefaultValue(23)
