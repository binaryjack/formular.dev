import { ValidationErrorsCodes } from '../constants/validation-errors-codes'

/** Type representing the keys of ValidationErrorsCodes */
export type ValidationErrorsCodesType = keyof typeof ValidationErrorsCodes

/** Type representing the actual error code values */
export type ValidationErrorsCodesValue = (typeof ValidationErrorsCodes)[ValidationErrorsCodesType]
