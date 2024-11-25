import { namesPattern } from './regExpPatterns'
import validationFactory from './validation.factory'
import { minMaxTypeMethodBuilder2, ValidationBuildersEnum } from './validation.types'

/** base empty validator */
const baseEmptyValidator = validationFactory.create(false)

/** base required validator */
const baseRequiredValidator = validationFactory.create(true)

/** base required name validator between 3 and 50 length*/
const minMaxNameBuilder = validationFactory.createMinMaxBasedBuilder<minMaxTypeMethodBuilder2>(
    ValidationBuildersEnum.minLengthMaxLength
)?.(3, 50)

const baseRequiredNameValidator = validationFactory.finalizer(true, minMaxNameBuilder, namesPattern)
