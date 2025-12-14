import { FieldSchemaBuilder, Validators } from 'formular.dev.lib'

export const DateBuilder = new FieldSchemaBuilder()
    .setTypeInput('date')
    .setMask('##/##/####')
    .setValidationData(true, Validators.date('fieldName', true).build())
