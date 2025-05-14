import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { IValidationManager, IValidationResult } from '../validation-manager.types'

/**
 * Validates the provided data using the strategies defined in the Validator instance.
 * @param {IValidationStrategyData} data - The data to be validated.
 * @returns {IValidationResult[]} An array of validation results from the applied strategies.
 */
export function validate(
    this: IValidationManager,
    field: IExtendedInput,
    reset?: boolean
): IValidationResult[] {
    const output: IValidationResult[] = []

    if (reset === true) {
        return output
    }
    for (const strategy of this.validationStrategies) {
        output.push(strategy.validate(field))
    }

    return output
}
