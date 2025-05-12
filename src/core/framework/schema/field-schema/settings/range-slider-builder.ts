import { FieldSchemaBuilder } from '@core/framework/schema/field-schema/field.schema.builder'

export const RangeBuilder = new FieldSchemaBuilder(10, 'rangeSlider')
    .setTypeData('range')
    .setDefaultValue('25')
