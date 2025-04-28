import { IEvents } from '../../events/events.types'
import validator from '../../validation-strategy/validator.strategy'
import { IFieldInput } from '../field-input.types'

/**
 * Handles the validation process for a field input.
 *
 * @param this - The current instance of the field input implementing the `IFieldInput` interface.
 * @param origin - Optional parameter representing the origin of the validation, which is cast to `IValidationOrigin`.
 *
 * @remarks
 * This function invokes the `validate` method on the current instance, passing a `validator` and the
 * optional `validationOrigin` derived from the `origin` parameter.
 */
export const handleValidation = function <T extends IEvents>(this: IFieldInput, data?: T) {
    const validationOrigin = data as IEvents
    this.validate(validator, validationOrigin)
}
