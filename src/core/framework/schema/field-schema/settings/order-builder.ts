import { FieldSchemaBuilder } from '@core/framework/schema/field-schema/field.schema.builder'

export const OrderBuilder = new FieldSchemaBuilder(2, 'order')
    .setTypeData('number')
    .setDefaultValue(2)
