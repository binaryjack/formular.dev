import { IMax } from '../interfaces/i-max'
import { IMaxLength } from '../interfaces/i-max-length'
import { IMin } from '../interfaces/i-min'
import { IMinLength } from '../interfaces/i-min-length'
import { IPattern } from '../interfaces/i-pattern'
import { IRequired } from '../interfaces/i-required'
import { IValidationBase } from '../interfaces/i-validation-base'

/**
 * Union type representing all possible validation rule combinations.
 *
 * This type allows for type-safe composition of different validation rules
 * while maintaining their specific constraints and error handling.
 */
export type IValidationGeneric =
    | (IValidationBase & IRequired)
    | (IValidationBase & IMax)
    | (IValidationBase & IMin)
    | (IValidationBase & IMaxLength)
    | (IValidationBase & IMinLength)
    | (IValidationBase & IPattern)
