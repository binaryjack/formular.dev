import { baseEmptyValidator } from './base-empty-validator'
import { baseRequiredNameValidator } from './base-required-name-validator'
import { baseRequiredValidator } from './base-required-validator'
import { dateEuValidator } from './dateEuValidator'
import { dateRequiredIso8601Validator } from './dateRequiredIso8601Validator'
import { eMailRequiredValidator } from './eMailRequiredValidator'

export const Validators = {
    baseEmptyValidator,
    baseRequiredValidator,
    baseRequiredNameValidator,
    dateEuValidator,
    dateRequiredIso8601Validator,
    eMailRequiredValidator
}
