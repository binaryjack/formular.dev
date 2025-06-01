import { ValidationConstraintBuilder } from '../../constraint-builder/validation-constraint-builder'
import { GenericValidationBuilder } from '../../generic-validation-builder/generic-validation-builder'
import { ValidationLocalizeKeys } from '../validation.localize.keys'
import { agePattern } from '../validation.regex.patterns'

export const ageValidator = (name: string, required: boolean = true) => {
    const constraints = []

    if (required) {
        constraints.push(
            new ValidationConstraintBuilder<boolean>('required')
                .setConstraint(true)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.ageError)
                .setGuideMessage(ValidationLocalizeKeys.ageGuide)
        )
    }

    // Age pattern validation
    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(agePattern)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.ageError)
            .setGuideMessage(ValidationLocalizeKeys.ageGuide)
    )

    // Min value for age
    constraints.push(
        new ValidationConstraintBuilder<number>('min')
            .setConstraint(1)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.ageError)
            .setGuideMessage(ValidationLocalizeKeys.ageGuide)
    )

    // Max value for age
    constraints.push(
        new ValidationConstraintBuilder<number>('max')
            .setConstraint(120)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.ageError)
            .setGuideMessage(ValidationLocalizeKeys.ageGuide)
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}
