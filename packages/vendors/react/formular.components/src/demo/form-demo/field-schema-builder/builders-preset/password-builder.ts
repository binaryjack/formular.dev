import { FieldSchemaBuilder } from 'formular.dev.lib'

export const PasswordBuilder = new FieldSchemaBuilder()
    .setTypeInput('text')
    .setDefaultValue('my super password')
