import { FieldSchemaBuilder } from '@core/framework/schema/field-schema/field.schema.builder'

export const UserIdBuilder = new FieldSchemaBuilder(11, 'userName')
    .setTypeData('text')
    .setDefaultValue('Tadeo')
