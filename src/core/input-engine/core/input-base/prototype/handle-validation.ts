import { IEvents } from '@core/framework/events/events.types'
import {
    IValidationResult,
    IValidationStrategyData
} from '@core/managers/validation-manager/validation-manager.types'
import { IInputBase } from '../input-base.types'

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
    this: IInputBase,
    e?: T,
    data?: IValidationStrategyData
) {
    console.log('----handleValidation---', this.name, this.value)
    if (this.name === undefined || this.value === undefined) {
        return
    }

    let results: IValidationResult[] = []
    console.log('----handleValidation', this.name, this.value)
    const currentField = this.dependencyName === 'InputBase' ? this : this.input

    if (currentField === undefined || currentField.validationManager === undefined) {
        console.warn('handleValidation', this)
        return
    }

    if (!currentField.validationManager) {
        currentField.message(
            'critical',
            this.name,
            `${handleValidation.name} has no validationOptions in order to proceed to any validation please provide valid ValidationStrategy ant the initializazion of the field. process ended`
        )
        return
    }

    if (data?.validationTriggerModeType.includes('onValidate')) {
        results = this.validationManager.validate(this) ?? []
    } else {
        // console.log('Validation skipped')
    }

    // keep the validation results for the field
    currentField.validationResults = results

    currentField.styleManager?.update(
        'valid',
        results.every((result) => result.state)
    )

    currentField.styleManager?.update(
        'errors',
        results.some((result) => !result.state)
    )

    return results
}
