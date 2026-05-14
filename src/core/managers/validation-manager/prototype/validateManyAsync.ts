import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { IValidationManager, IValidationResult } from '../validation-manager.types'

/**
 * Validates the provided data using the strategies defined in the Validator instance.
 * @param {IValidationStrategyData} data - The data to be validated.
 * @returns {IValidationResult[]} An array of validation results from the applied strategies.
 */
export const validateManyAsync = async function (
    this: IValidationManager,
    fields: IExtendedInput[],
    reset?: boolean
): Promise<IValidationResult[]> {
    return new Promise((resolve) => {
        const output: IValidationResult[] = []
        if (reset === true) {
            resolve(output)
        }
        fields.forEach(async (field) => {
            const res = (await this?.validateAsync?.(field, reset)) ?? []
            output.push(...res)
        })
        resolve(output)
    })
}
