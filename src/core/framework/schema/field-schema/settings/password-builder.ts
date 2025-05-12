import { FieldSchemaBuilder } from '@core/framework/schema/field-schema/field.schema.builder'

export const PasswordBuilder = new FieldSchemaBuilder(12, 'password')
    .setTypeData('text')
    .setDefaultValue('my super password')
