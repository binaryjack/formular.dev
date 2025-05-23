import { FieldSchemaBuilder } from '@core/framework/schema/field-schema/field.schema.builder'

export const SelectIdBuilder = new FieldSchemaBuilder(5, 'selectOptionsId')
    .setTypeData('select')
    .setDefaultValue(5)
