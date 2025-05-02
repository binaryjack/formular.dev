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

    if (!this.validationStrategy()) {
        this.message(
            'critical',
            this.name,
            `${handleValidation.name} has no validationOptions in order to proceed to any validation please provide valid ValidationStrategy ant the initializazion of the field. process ended`
        )
        return
    }

    if (data?.types.includes('onValidate')) {
        const validationstrategyData = newValidationStrategyData(
            this.name,
            this.type,
            this.validationStrategy()!.validationOptions,
            this.valueStrategy()?.getAsString(),
            this.expectedValue,
            data
        )

        results = this.validationStrategy()!.validate(validationstrategyData) ?? []
    } else {
        // console.log('Validation skipped')
    }

    // keep the validation results for the field
    this.validationStrategy()!.validationResults = results

    this.style()?.fieldStateStyle.update(
        'valid',
        results.every((result) => result.state)
    )

    this.style()?.fieldStateStyle.update(
        'errors',
        results.some((result) => !result.state)
    )

    return results
}
