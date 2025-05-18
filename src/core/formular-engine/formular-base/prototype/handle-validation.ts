// handle-validation.ts

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
export function handleValidation<T extends object>(this: IFormular<T>) {
    this.validateAll()
}
