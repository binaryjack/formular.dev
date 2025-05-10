import { IEvents } from '@core/framework/events/events.types'
import {
    IValidationResult,
    IValidationStrategyData
} from '@core/managers/validation-manager/validation-manager.types'
import { IFieldBaseInput } from '../field-input-base-types'

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
export const handleValidation = function <T extends IEvents>(
    this: IFieldBaseInput,
    e?: T,
    data?: IValidationStrategyData
) {
    let results: IValidationResult[] = []

    if (!this.validationManager) {
        this.message(
            'critical',
            this.name,
            `${handleValidation.name} has no validationOptions in order to proceed to any validation please provide valid ValidationStrategy ant the initializazion of the field. process ended`
        )
        return
    }

    // if (data?.validationTriggerModeType.includes('onValidate')) {
    //     const validationstrategyData = newValidationStrategyData(
    //         this.name,
    //         this.type,
    //         this.validationOptions,
    //         this.valueStrategy?.toString(),
    //         this.expectedValue,
    //         this.validationTriggerModeType,
    //         this.shouldValidate,
    //         this.name
    //     )

    //     results = this.validationStrategy!.validate(validationstrategyData) ?? []
    // } else {
    //     // console.log('Validation skipped')
    // }

    // keep the validation results for the field
    this.validationResults = results

    this.styleManager?.update(
        'valid',
        results.every((result) => result.state)
    )

    this.styleManager?.update(
        'errors',
        results.some((result) => !result.state)
    )

    return results
}
