import { FieldSchemaBuilder } from '@core/framework/schema/field-schema/field.schema.builder'

export const InputTextBuilder = new FieldSchemaBuilder()
    .setTypeInput('text')
    .setDefaultValue('Ma valeur')
