// handle-validation.ts

import { IValidationStrategyData } from '@core/managers/validation-manager/validation-manager.types'
import { IFormular } from '../formular-base.types'

/**
 * Handles validation for the Formy instance.
 *
 * This method triggers the validation process for all fields in the Formy instance.
 * It ensures that the current state of the form is validated and any errors are captured.
 *
 * @param origin - An optional parameter to specify the origin of the validation process.
 *                 This can be used to track or log the source of the validation trigger.
 */
export function handleValidation(this: IFormular, data?: IValidationStrategyData) {
    this.validateAll(data)
}
