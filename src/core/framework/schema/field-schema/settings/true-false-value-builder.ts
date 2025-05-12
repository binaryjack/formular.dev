import { FieldSchemaBuilder } from '@core/framework/schema/field-schema/field.schema.builder'

export const CheckBuilder = new FieldSchemaBuilder(6, 'trueFalseValue')
    .setTypeData('checkbox')
    .setDefaultValue(true)
