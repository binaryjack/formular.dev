import { ValidationConstraintBuilder } from '../../constraint-builder/validation-constraint-builder'
import { GenericValidationBuilder } from '../../generic-validation-builder/generic-validation-builder'
import { ValidationLocalizeKeys } from '../validation.localize.keys'
import { phonePattern } from '../validation.regex.patterns'

export const phoneValidator = (name: string, required: boolean = true) => {
    const constraints = []

    if (required) {
        constraints.push(
            new ValidationConstraintBuilder<boolean>('required')
                .setConstraint(true)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.phoneError)
                .setGuideMessage(ValidationLocalizeKeys.phoneGuide)
        )
    }

    // Phone pattern validation
    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(phonePattern)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.phonePatternError)
            .setGuideMessage(ValidationLocalizeKeys.phonePatternGuide)
    )

    // Min length for phone
    constraints.push(
        new ValidationConstraintBuilder<number>('minLength')
            .setConstraint(7)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.phoneError)
            .setGuideMessage(ValidationLocalizeKeys.phoneGuide)
    )

    // Max length for phone
    constraints.push(
        new ValidationConstraintBuilder<number>('maxLength')
            .setConstraint(20)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.phoneError)
            .setGuideMessage(ValidationLocalizeKeys.phoneGuide)
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}
