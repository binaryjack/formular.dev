import { FieldSchemaBuilder } from '@core/framework/schema/field-schema/field-schema-builder'

export const PasswordBuilder = new FieldSchemaBuilder()
    .setTypeInput('text')
    .setDefaultValue('my super password')
