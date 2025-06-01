import { ValidationConstraintBuilder } from '../../constraint-builder/validation-constraint-builder'
import { GenericValidationBuilder } from '../../generic-validation-builder/generic-validation-builder'
import { ValidationLocalizeKeys } from '../validation.localize.keys'
import { currencyPattern } from '../validation.regex.patterns'

export const currencyValidator = (name: string, required: boolean = true) => {
    const constraints = []

    if (required) {
        constraints.push(
            new ValidationConstraintBuilder<boolean>('required')
                .setConstraint(true)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.currencyError)
                .setGuideMessage(ValidationLocalizeKeys.currencyGuide)
        )
    }

    // Currency pattern validation
    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(currencyPattern)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.currencyError)
            .setGuideMessage(ValidationLocalizeKeys.currencyGuide)
    )

    // Max length for currency
    constraints.push(
        new ValidationConstraintBuilder<number>('maxLength')
            .setConstraint(20)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.currencyError)
            .setGuideMessage(ValidationLocalizeKeys.currencyGuide)
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}
