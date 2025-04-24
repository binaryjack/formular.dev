import { baseEmptyValidator } from './base-empty-validator'
import { baseRequiredNameValidator } from './base-required-name-validator'
import { baseRequiredValidator } from './base-required-validator'
import { dateEuValidator } from './date-eu-validator'
import { dateRequiredIso8601Validator } from './date-required-iso-8601-validator'
import { eMailRequiredValidator } from './e-mail-required-validator'

export const Validators = {
    baseEmptyValidator,
    baseRequiredValidator,
    baseRequiredNameValidator,
    dateEuValidator,
    dateRequiredIso8601Validator,
    eMailRequiredValidator
}
