import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { IValidationManager, IValidationResult } from '../validation-manager.types'

/**
 * Validates the provided data using the strategies defined in the Validator instance.
 * Uses caching to avoid redundant validation of unchanged fields.
 * @param {IValidationStrategyData} data - The data to be validated.
 * @returns {IValidationResult[]} An array of validation results from the applied strategies.
 */
export const validateAsync = async function (
    this: IValidationManager,
    field: IExtendedInput,
    reset?: boolean
): Promise<IValidationResult[]> {
    return new Promise(async (resolve) => {
        const output: IValidationResult[] = []

        if (reset === true) {
            this.validationCache?.invalidate(field.name)
            resolve(output)
            return
        }

        // Check cache first
        const cached = this.validationCache?.get(field.name, field.value, this.validationStrategies)
        if (cached) {
            resolve(cached)
            return
        }

        // Perform validation
        for (const strategy of this.validationStrategies) {
            output.push(await strategy.validateAsync(field))
        }

        // Cache results
        this.validationCache?.set(field.name, field.value, this.validationStrategies, output)

        resolve(output)
    })
}
