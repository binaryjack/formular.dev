import { FieldSchemaBuilder } from '@core/framework/schema/field-schema/field.schema.builder'
import { Validators } from '@core/managers/validation-manager/validation-schema/validators'

export const DateBuilder = new FieldSchemaBuilder()
    .setTypeInput('date')
    .setMask('##/##/####')
    .setValidationData(true, Validators.date('fieldName', true).build())
