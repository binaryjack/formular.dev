import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { IValidationManager, IValidationResult } from '../validation-manager.types'

/**
 * Validates the provided data using the strategies defined in the Validator instance.
 * Uses caching to avoid redundant validation of unchanged fields.
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
        this.validationCache?.invalidate(field.name)
        return output
    }

    // Check cache first
    const cached = this.validationCache?.get(field.name, field.value, this.validationStrategies)
    if (cached) {
        return cached
    }

    // Perform validation
    for (const strategy of this.validationStrategies) {
        output.push(strategy.validate(field))
    }

    // Cache results
    this.validationCache?.set(field.name, field.value, this.validationStrategies, output)

    return output
}
