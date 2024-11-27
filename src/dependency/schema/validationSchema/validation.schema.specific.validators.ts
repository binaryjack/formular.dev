import {
    dateEuPattern,
    dateIso8601Pattern,
    eMailPattern,
    namesPattern
} from './validation.regex.patterns'
import {
    minMaxTypeMethodBuilder1,
    minMaxTypeMethodBuilder2,
    ValidationSchemaBuildersEnum
} from './validation.schema.builder.types'
import validationSchemaFactory from './validation.schema.factory'

/** base empty validator */
const baseEmptyValidator = validationSchemaFactory.create(false)

/** base required validator */
const baseRequiredValidator = validationSchemaFactory.create(true)

/** base required name validator between 3 and 50 length*/
const minMaxNameBuilder =
    validationSchemaFactory.createMinMaxBasedBuilder<minMaxTypeMethodBuilder2>(
        ValidationSchemaBuildersEnum.MinLengthAndMaxLengthBuilder
    )?.(3, 50)

const baseRequiredNameValidator = validationSchemaFactory.finalizer(
    true,
    minMaxNameBuilder,
    namesPattern
)

/** base required name validator between 3 and 50 length*/
const minMaxDatesBuilder =
    validationSchemaFactory.createMinMaxBasedBuilder<minMaxTypeMethodBuilder2>(
        ValidationSchemaBuildersEnum.MinLengthAndMaxLengthBuilder
    )?.(10, 10)

const dateEuValidator = validationSchemaFactory.finalizer(true, minMaxDatesBuilder, dateEuPattern)
const dateRequiredIso8601Validator = validationSchemaFactory.finalizer(
    true,
    minMaxDatesBuilder,
    dateIso8601Pattern
)

const eMAilBuilder = validationSchemaFactory.createMinMaxBasedBuilder<minMaxTypeMethodBuilder1>(
    ValidationSchemaBuildersEnum.MaxLengthBuilder
)?.(150)

const eMailRequiredValidator = validationSchemaFactory.finalizer(true, eMAilBuilder, eMailPattern)

export const Validators = {
    baseEmptyValidator,
    baseRequiredValidator,
    baseRequiredNameValidator,
    dateEuValidator,
    dateRequiredIso8601Validator,
    eMailRequiredValidator
}
