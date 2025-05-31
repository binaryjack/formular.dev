import { eMailPattern } from '../validation.regex.patterns'

export const eMailRequiredValidator = validationSchemaFactory.finalizer(
    true,
    eMAilBuilder,
    eMailPattern
)
