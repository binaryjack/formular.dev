import { ValidationConstraintBuilder } from '../../constraint-builder/validation-constraint-builder'
import { GenericValidationBuilder } from '../../generic-validation-builder/generic-validation-builder'
import { ValidationLocalizeKeys } from '../validation.localize.keys'
import { numericOnly } from '../validation.regex.patterns'

export const numericValidator = (
    name: string,
    required: boolean = true,
    minValue?: number,
    maxValue?: number
) => {
    const constraints = []

    if (required) {
        constraints.push(
            new ValidationConstraintBuilder<boolean>('required')
                .setConstraint(true)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.numberError)
                .setGuideMessage(ValidationLocalizeKeys.numberGuide)
        )
    }

    // Numeric pattern validation
    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(numericOnly)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.numberError)
            .setGuideMessage(ValidationLocalizeKeys.numberGuide)
    )

    // Min value validation
    if (minValue !== undefined) {
        constraints.push(
            new ValidationConstraintBuilder<number>('min')
                .setConstraint(minValue)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.minError)
                .setGuideMessage(ValidationLocalizeKeys.minGuide)
        )
    }

    // Max value validation
    if (maxValue !== undefined) {
        constraints.push(
            new ValidationConstraintBuilder<number>('max')
                .setConstraint(maxValue)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.maxError)
                .setGuideMessage(ValidationLocalizeKeys.maxGuide)
        )
    }

    return new GenericValidationBuilder().setConstraints(constraints)
}
