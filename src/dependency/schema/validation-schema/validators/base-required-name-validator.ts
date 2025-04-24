import { minMaxNameBuilder } from '../builders/min-max-name-builder'
import validationSchemaFactory from '../schema/factory/validation.schema.factory'
import { namesPattern } from '../validation.regex.patterns'

export const baseRequiredNameValidator = validationSchemaFactory.finalizer(
    true,
    minMaxNameBuilder,
    namesPattern
)
