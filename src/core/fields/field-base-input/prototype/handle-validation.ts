import {
    IValidationResult,
    newValidationStrategyData
} from '@core/validation-strategy/validation-strategy.types'
import { IEvents } from '../../../events/events.types'
import { IFieldInput } from '../field-input-base-types'

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
    let results: IValidationResult[] = []

    if (data?.types.includes('onValidate')) {
        const validationstrategyData = newValidationStrategyData(
            this?.name,
            this.type,
            this.validationOptions,
            this?.getAsString(),
            this.expectedValue,
            data
        )

        results = this?.validate?.(validationstrategyData) ?? []
    } else {
        // console.log('Validation skipped')
    }

    // keep the validation results for the field
    this.validationResults = results

    this._style?.fieldStateStyle.update(
        'valid',
        results.every((result) => result.state)
    )

    this._style?.fieldStateStyle.update(
        'errors',
        results.some((result) => !result.state)
    )

    return results
}
