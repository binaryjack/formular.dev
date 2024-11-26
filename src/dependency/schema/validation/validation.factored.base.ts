import { dateEuPattern, dateIso8601Pattern, eMailPattern, namesPattern } from './regExpPatterns'
import validationFactory from './validation.factory'
import {
    minMaxTypeMethodBuilder1,
    minMaxTypeMethodBuilder2,
    ValidationBuildersEnum
} from './validation.types'

/** base empty validator */
const baseEmptyValidator = validationFactory.create(false)

/** base required validator */
const baseRequiredValidator = validationFactory.create(true)

/** base required name validator between 3 and 50 length*/
const minMaxNameBuilder = validationFactory.createMinMaxBasedBuilder<minMaxTypeMethodBuilder2>(
    ValidationBuildersEnum.MinLengthAndMaxLengthBuilder
)?.(3, 50)

const baseRequiredNameValidator = validationFactory.finalizer(true, minMaxNameBuilder, namesPattern)

/** base required name validator between 3 and 50 length*/
const minMaxDatesBuilder = validationFactory.createMinMaxBasedBuilder<minMaxTypeMethodBuilder2>(
    ValidationBuildersEnum.MinLengthAndMaxLengthBuilder
)?.(10, 10)

const dateEuValidator = validationFactory.finalizer(true, minMaxDatesBuilder, dateEuPattern)
const dateRequiredIso8601Validator = validationFactory.finalizer(
    true,
    minMaxDatesBuilder,
    dateIso8601Pattern
)

const eMAilBuilder = validationFactory.createMinMaxBasedBuilder<minMaxTypeMethodBuilder1>(
    ValidationBuildersEnum.MaxLengthBuilder
)?.(150)

const eMailRequiredValidator = validationFactory.finalizer(true, eMAilBuilder, eMailPattern)

export const Validators = {
    baseEmptyValidator,
    baseRequiredValidator,
    baseRequiredNameValidator,
    dateEuValidator,
    dateRequiredIso8601Validator,
    eMailRequiredValidator
}
