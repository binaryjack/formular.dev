import { ValidationConstraintBuilder } from '../../constraint-builder/validation-constraint-builder'
import { GenericValidationBuilder } from '../../generic-validation-builder/generic-validation-builder'
import { ValidationLocalizeKeys } from '../validation.localize.keys'
import { firstNamePattern } from '../validation.regex.patterns'

export const firstNameValidator = (name: string, required: boolean = true) => {
    const constraints = []

    if (required) {
        constraints.push(
            new ValidationConstraintBuilder<boolean>('required')
                .setConstraint(true)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.firstNameError)
                .setGuideMessage(ValidationLocalizeKeys.firstNameGuide)
        )
    }

    // First name pattern validation
    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(firstNamePattern)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.firstNameError)
            .setGuideMessage(ValidationLocalizeKeys.firstNameGuide)
    )

    // Min length for first name
    constraints.push(
        new ValidationConstraintBuilder<number>('minLength')
            .setConstraint(2)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.firstNameError)
            .setGuideMessage(ValidationLocalizeKeys.firstNameGuide)
    )

    // Max length for first name
    constraints.push(
        new ValidationConstraintBuilder<number>('maxLength')
            .setConstraint(50)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.firstNameError)
            .setGuideMessage(ValidationLocalizeKeys.firstNameGuide)
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}
