import { ValidationConstraintBuilder } from '../../constraint-builder/validation-constraint-builder'
import { GenericValidationBuilder } from '../../generic-validation-builder/generic-validation-builder'
import { ValidationLocalizeKeys } from '../validation.localize.keys'
import { urlPattern } from '../validation.regex.patterns'

export const urlValidator = (name: string, required: boolean = true) => {
    const constraints = []

    if (required) {
        constraints.push(
            new ValidationConstraintBuilder<boolean>('required')
                .setConstraint(true)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.urlError)
                .setGuideMessage(ValidationLocalizeKeys.urlGuide)
        )
    }

    // URL pattern validation
    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(urlPattern)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.urlPatternError)
            .setGuideMessage(ValidationLocalizeKeys.urlPatternGuide)
    )

    // Max length for URL
    constraints.push(
        new ValidationConstraintBuilder<number>('maxLength')
            .setConstraint(2048)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.urlError)
            .setGuideMessage(ValidationLocalizeKeys.urlGuide)
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}
