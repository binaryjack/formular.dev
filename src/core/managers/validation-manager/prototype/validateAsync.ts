import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { IValidationManager, IValidationResult } from '../validation-manager.types'

/**
 * Validates the provided data using the strategies defined in the Validator instance.
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

        // await sleep(3000)

        if (reset === true) {
            resolve(output)
        }
        for (const strategy of this.validationStrategies) {
            output.push(await strategy.validateAsync(field))
        }

        resolve(output)
    })
}
