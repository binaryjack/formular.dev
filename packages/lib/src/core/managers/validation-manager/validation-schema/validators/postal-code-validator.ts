import {
    IValidationConstraintBuilder,
    ValidationConstraintBuilder
} from '../../constraint-builder/validation-constraint-builder'
import { GenericValidationBuilder } from '../../generic-validation-builder/generic-validation-builder'
import { ValidationLocalizeKeys } from '../validation.localize.keys'
import {
    postalCodeCanadaPattern,
    postalCodeUKPattern,
    postalCodeUSPattern
} from '../validation.regex.patterns'
import { PostalCodeRegionType } from './types/postal-code-region.type'

// Backward compatibility alias
export type PostalCodeRegion = PostalCodeRegionType

export const postalCodeValidator = (
    name: string,
    region: PostalCodeRegionType = 'US',
    required: boolean = true
) => {
    const constraints: IValidationConstraintBuilder<any>[] = []

    if (required) {
        constraints.push(
            new ValidationConstraintBuilder<boolean>('required')
                .setConstraint(true)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.postalCodeError)
                .setGuideMessage(ValidationLocalizeKeys.postalCodeGuide)
        )
    }

    // Select pattern based on region
    let pattern: RegExp
    switch (region) {
        case 'CA':
            pattern = postalCodeCanadaPattern
            break
        case 'UK':
            pattern = postalCodeUKPattern
            break
        default:
            pattern = postalCodeUSPattern
            break
    }

    // Postal code pattern validation
    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(pattern)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.postalCodeError)
            .setGuideMessage(ValidationLocalizeKeys.postalCodeGuide)
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}
