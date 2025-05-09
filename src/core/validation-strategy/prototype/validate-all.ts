import { IFieldInput } from '@core/fields/field-base-input/field-input-base-types'
import {
    IValidationResult,
    IValidationResults,
    IValidationStrategy,
    newValidationResults
} from '../validation-strategy.types'

/**
 * Validates all fields using the provided validation strategies.
 *
 * @param {IFieldInput[]} fields - An array of field inputs to be validated.
 * @returns {IValidationResults} The validation results, including the overall validity state.
 */
export const validateAll = function (this: IValidationStrategy, fields: IFieldInput[]) {
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
