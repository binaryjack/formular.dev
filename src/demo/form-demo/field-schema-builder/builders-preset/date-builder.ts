import { FieldSchemaBuilder } from '@core/framework/schema/field-schema/field.schema.builder'

export const DateBuilder = new FieldSchemaBuilder(7, 'datePickerFieldDemo')
    .setTypeData('date')
    .setMask('##/##/####')
    .setDefaultValue('24/10/1977')
