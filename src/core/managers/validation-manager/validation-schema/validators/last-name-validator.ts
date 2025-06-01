import {
    IValidationConstraintBuilder,
    ValidationConstraintBuilder
} from '../../constraint-builder/validation-constraint-builder'
import { GenericValidationBuilder } from '../../generic-validation-builder/generic-validation-builder'
import { ValidationLocalizeKeys } from '../validation.localize.keys'
import { lastNamePattern } from '../validation.regex.patterns'

export const lastNameValidator = (name: string, required: boolean = true) => {
    const constraints: IValidationConstraintBuilder<any>[] = []

    if (required) {
        constraints.push(
            new ValidationConstraintBuilder<boolean>('required')
                .setConstraint(true)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.lastNameError)
                .setGuideMessage(ValidationLocalizeKeys.lastNameGuide)
        )
    }

    // Last name pattern validation
    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(lastNamePattern)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.lastNameError)
            .setGuideMessage(ValidationLocalizeKeys.lastNameGuide)
    )

    // Min length for last name
    constraints.push(
        new ValidationConstraintBuilder<number>('minLength')
            .setConstraint(2)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.lastNameError)
            .setGuideMessage(ValidationLocalizeKeys.lastNameGuide)
    )

    // Max length for last name
    constraints.push(
        new ValidationConstraintBuilder<number>('maxLength')
            .setConstraint(50)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.lastNameError)
            .setGuideMessage(ValidationLocalizeKeys.lastNameGuide)
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}
