import {
    IValidationManager,
    IValidationResult,
    IValidationStrategyData
} from '../validation-manager.types'

/**
 * Validates the provided data using the strategies defined in the Validator instance.
 * @param {IValidationStrategyData} data - The data to be validated.
 * @returns {IValidationResult[]} An array of validation results from the applied strategies.
 */
export function validate(
    this: IValidationManager,
    data: IValidationStrategyData
): IValidationResult[] {
    const output: IValidationResult[] = []

    if (data.origin?.types.includes('onResetValidation')) {
        return output
    }

    for (const strategy of this.validationStrategies) {
        output.push(strategy.validate(data))
    }

    return output
}
