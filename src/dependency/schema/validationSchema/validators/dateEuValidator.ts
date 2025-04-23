import { minMaxDatesBuilder } from '../builders/minMaxDatesBuilder'
import validationSchemaFactory from '../schema/factory/validation.schema.factory'
import { dateEuPattern } from '../validation.regex.patterns'

export const dateEuValidator = validationSchemaFactory.finalizer(
    true,
    minMaxDatesBuilder,
    dateEuPattern
)
