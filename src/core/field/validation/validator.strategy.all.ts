import { IFieldInput } from '../fieldInputBase/fieldInputBase.types'
import validator from './validator.strategy'
import {
    IValidationResult,
    IValidationResults,
    newValidationResults,
    newValidatorStrategyData
} from './validator.types'

export const validateAll = (fields: IFieldInput[]): IValidationResults => {
    if (fields?.length === 0) return newValidationResults(false)

    let mainResults: IValidationResult[] = []

    for (const field of fields) {
        const validationstrategyData = newValidatorStrategyData(
            field.name,
            field.type,
            field.validationOptions,
            field.get(),
            field.expectedValue
        )
        mainResults = [...mainResults, ...validator.validate(validationstrategyData)]
    }
    const output = newValidationResults(false)
    output.isValid = mainResults?.every((o) => o.state) ?? false
    return output
}
