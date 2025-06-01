import {
    IValidationConstraintBuilder,
    ValidationConstraintBuilder
} from '../../constraint-builder/validation-constraint-builder'
import { GenericValidationBuilder } from '../../generic-validation-builder/generic-validation-builder'
import { ValidationLocalizeKeys } from '../validation.localize.keys'
import { creditCardPattern } from '../validation.regex.patterns'

export const creditCardValidator = (name: string, required: boolean = true) => {
    const constraints: IValidationConstraintBuilder<any>[] = []

    if (required) {
        constraints.push(
            new ValidationConstraintBuilder<boolean>('required')
                .setConstraint(true)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.creditCardError)
                .setGuideMessage(ValidationLocalizeKeys.creditCardGuide)
        )
    }

    // Credit card pattern validation
    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(creditCardPattern)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.creditCardError)
            .setGuideMessage(ValidationLocalizeKeys.creditCardGuide)
    )

    // Min length for credit card
    constraints.push(
        new ValidationConstraintBuilder<number>('minLength')
            .setConstraint(13)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.creditCardError)
            .setGuideMessage(ValidationLocalizeKeys.creditCardGuide)
    )

    // Max length for credit card
    constraints.push(
        new ValidationConstraintBuilder<number>('maxLength')
            .setConstraint(19)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.creditCardError)
            .setGuideMessage(ValidationLocalizeKeys.creditCardGuide)
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}
