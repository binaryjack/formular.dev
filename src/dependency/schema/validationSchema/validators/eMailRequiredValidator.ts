import { eMAilBuilder } from '../builders/eMAilBuilder'
import validationSchemaFactory from '../schema/factory/validation.schema.factory'
import { eMailPattern } from '../validation.regex.patterns'

export const eMailRequiredValidator = validationSchemaFactory.finalizer(
    true,
    eMAilBuilder,
    eMailPattern
)
