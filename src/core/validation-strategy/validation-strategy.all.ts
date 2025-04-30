import { IFieldInput } from '@core/fields/field-base-input/field-input-base-types'
import {
    IValidationResult,
    IValidationResults,
    newValidationResults,
    newValidationStrategyData
} from './validation-strategy.types'

/**
 * Validates all fields using the provided validation strategies.
 *
 * @param {IFieldInput[]} fields - An array of field inputs to be validated.
 * @returns {IValidationResults} The validation results, including the overall validity state.
 */
export const validateAll = (fields: IFieldInput[]): IValidationResults => {
    if (fields?.length === 0) return newValidationResults(false)

    let mainResults: IValidationResult[] = []

    for (const field of fields) {
        const validationstrategyData = newValidationStrategyData(
            field.name,
            field.type,
            field.validationOptions,
            field.getValue(),
            field.expectedValue
        )
        mainResults = [...mainResults, ...validate(validationstrategyData)]
    }
    const output = newValidationResults(false)
    output.isValid = mainResults?.every((o) => o.state) ?? false
    return output
}
