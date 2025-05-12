import { IInput } from '@core/field-engine/core/input-base/input-base.types'
import {
    IValidationManager,
    IValidationResult,
    IValidationResults,
    newValidationResults
} from '../validation-manager.types'

/**
 * Validates all fields using the provided validation strategies.
 *
 * @param {IInput[]} fields - An array of field inputs to be validated.
 * @returns {IValidationResults} The validation results, including the overall validity state.
 */
export const validateAll = function (this: IValidationManager, fields: IInput[]) {
    if (fields?.length === 0) return newValidationResults(false)

    let mainResults: IValidationResult[] = []

    // for (const field of fields) {
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
    //     mainResults = [...mainResults, ...field.validate(validationstrategyData)]
    // }
    const output = newValidationResults(false)
    output.isValid = mainResults?.every((o) => o.state) ?? false
    return output
}
