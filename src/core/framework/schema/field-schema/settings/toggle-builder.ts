import { FieldSchemaBuilder } from '@core/framework/schema/field-schema/field.schema.builder'

export const ToggleBuilder = new FieldSchemaBuilder(13, 'toggle')
    .setTypeData('toggle')
    .setDefaultValue(true)
