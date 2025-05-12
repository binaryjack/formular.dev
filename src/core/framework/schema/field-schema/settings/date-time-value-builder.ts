import { FieldSchemaBuilder } from '@core/framework/schema/field-schema/field.schema.builder'

export const DateTimeBuilder = new FieldSchemaBuilder(7, 'dateTimeValue')
    .setTypeData('date')
    .setDefaultValue('24/10/1977')
