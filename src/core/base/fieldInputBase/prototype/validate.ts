import {
    IValidationOrigin,
    IValidationResult,
    IValidator,
    newValidatorStrategyData
} from '../../validatiors/validator.types'
import { IFieldInput } from '../fieldInput.types'

export const validate = function (this: IFieldInput, vtor: IValidator, origin?: IValidationOrigin) {
    let results: IValidationResult[] = []

    if (origin?.fieldState !== 'reset') {
        const validationstrategyData = newValidatorStrategyData(
            this.name,
            this.type,
            this.validationOptions,
            this.get(),
            this.expectedValue,
            origin
        )
        results = vtor.validate(validationstrategyData)
    } else {
        console.log('Validation skipped')
    }

    // keep the validation results for the field
    this.validationResults = results

    this.fieldStateStyle.update(
        'valid',
        results.every((result) => result.state)
    )

    this.fieldStateStyle.update(
        'errors',
        results.some((result) => !result.state)
    )

    return results
}
