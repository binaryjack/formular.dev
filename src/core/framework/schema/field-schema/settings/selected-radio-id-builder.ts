import { FieldSchemaBuilder } from '@core/framework/schema/field-schema/field.schema.builder'

export const RadioBuilder = new FieldSchemaBuilder(8, 'selectedRadioId')
    .setTypeData('radio')
    .setDefaultValue('value-2')
