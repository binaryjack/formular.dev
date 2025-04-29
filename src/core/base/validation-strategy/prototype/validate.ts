import { IValidationResult, IValidator, IValidatorStrategyData } from '../validator.types'

/**
 * Validates the provided data using the strategies defined in the Validator instance.
 * @param {IValidatorStrategyData} data - The data to be validated.
 * @returns {IValidationResult[]} An array of validation results from the applied strategies.
 */
export function validate(this: IValidator, data: IValidatorStrategyData): IValidationResult[] {
    const output: IValidationResult[] = []

    if (data.origin?.types.includes('onResetValidation')) {
        return output
    }

    for (const strategy of this.strategies) {
        output.push(strategy.validate(data))
    }

    return output
}
