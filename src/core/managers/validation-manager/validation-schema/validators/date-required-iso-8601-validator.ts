import { minMaxDatesBuilder } from '../presets/min-max-dates-builder'
import validationSchemaFactory from '../schema/factory/validation.schema.factory'
import { dateIso8601Pattern } from '../validation.regex.patterns'

export const dateRequiredIso8601Validator = validationSchemaFactory.finalizer(
    true,
    minMaxDatesBuilder,
    dateIso8601Pattern
)
