// set-validation-trigger-mode.ts

import { ValidationTriggerModeType } from '../../validation-strategy/validator.types'
import { IFormy } from '../formy-base.types'

/**
 * Sets the validation trigger mode for the Formy instance.
 * @param mode - An array of validation trigger modes to set.
 */
export function setValidationTriggerMode(this: IFormy, mode: ValidationTriggerModeType[]) {
    this.validationTriggerModeType = mode
}
