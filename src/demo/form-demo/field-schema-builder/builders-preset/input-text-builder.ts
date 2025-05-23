import { FieldSchemaBuilder } from '@core/framework/schema/field-schema/field.schema.builder'

export const InputTextBuilder = new FieldSchemaBuilder(4, 'inputControl')
    .setTypeData('text')
    .setDefaultValue('Ma valeur')
