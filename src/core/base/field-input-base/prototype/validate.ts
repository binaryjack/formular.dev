import { IFieldInput } from '../../abstract-base-input/field-input-base-types'
import { IEvents } from '../../events/events.types'
import {
    IValidationResult,
    IValidator,
    newValidatorStrategyData
} from '../../validation-strategy/validator.types'

/**
 * Validates the current field input using the provided validator and optional validation origin.
 *
 * @param this - The current field input instance implementing the `IFieldInput` interface.
 * @param vtor - The validator instance implementing the `IValidator` interface, used to perform validation.
 * @param origin - (Optional) The origin of the validation, which may include additional context such as field state.
 *                 If the `fieldState` in the origin is `'reset'`, validation is skipped.
 *
 * @returns An array of validation results (`IValidationResult[]`) indicating the outcome of the validation.
 *
 * @remarks
 * - If the `fieldState` in the `origin` parameter is `'reset'`, validation is skipped, and an empty array is returned.
 * - The validation results are stored in the `validationResults` property of the field input.
 * - The `fieldStateStyle` is updated based on the validation results:
 *   - `'valid'` is set to `true` if all validation results have a `state` of `true`.
 *   - `'errors'` is set to `true` if any validation result has a `state` of `false`.
 *
 * @example
 * ```typescript
 * const validationResults = fieldInput.validate(validator, { fieldState: 'active' });
 * console.log(validationResults);
 * ```
 */
export const validate = function (this: IFieldInput, vtor: IValidator, event?: IEvents) {
    let results: IValidationResult[] = []
    if (!vtor) {
        return {
            state: true
        }
    }

    if (event?.types.includes('onValidate')) {
        const validationstrategyData = newValidatorStrategyData(
            this?.name,
            this.type,
            this.validationOptions,
            this?.getValue(),
            this.expectedValue,
            event
        )

        results = vtor?.validate?.(validationstrategyData)
    } else {
        // console.log('Validation skipped')
    }

    // keep the validation results for the field
    this.validationResults = results

    this.fieldStateStyle.update(
        'valid',
        results.every((result) => result.state)
    )

    this.fieldStateStyle.update(
        'errors',
        results.some((result) => !result.state)
    )

    return results
}
