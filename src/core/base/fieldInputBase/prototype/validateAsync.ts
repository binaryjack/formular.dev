import {
    IValidationResult,
    IValidatorStrategyData,
    newValidatorStrategyData
} from '../../validatiors/validator.types'
import { IFieldInput } from '../fieldInput.types'

// // IValidatorStrategyData enhancement
// export interface IValidatorStrategyData {
//     // existing properties...
//     asyncValidators?: Array<(data: IValidatorStrategyData) => Promise<IValidationResult>>
// }

// Async validator implementation
export const validateAsync = async function (
    this: IFieldInput,
    validators: Array<(data: IValidatorStrategyData) => Promise<IValidationResult>>
) {
    const data = newValidatorStrategyData(
        this.name,
        this.type,
        this.validationOptions,
        this.getValue(),
        this.expectedValue
    )

    // Set loading state
    this.isValidating = true
    this.observers.trigger()

    try {
        const results = await Promise.all(validators.map((validator) => validator(data)))
        this.validationResults = results

        // Update validation state
        this.fieldStateStyle.update(
            'valid',
            results.every((result: IValidationResult) => result.state)
        )

        this.fieldStateStyle.update(
            'errors',
            results.some((result: IValidationResult) => !result.state)
        )

        return results
    } finally {
        this.isValidating = false
        this.observers.trigger()
    }
}
