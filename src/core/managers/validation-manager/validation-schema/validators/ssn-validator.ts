import {
    IValidationConstraintBuilder,
    ValidationConstraintBuilder
} from '../../constraint-builder/validation-constraint-builder'
import { GenericValidationBuilder } from '../../generic-validation-builder/generic-validation-builder'
import { ValidationLocalizeKeys } from '../validation.localize.keys'
import { ssnPattern } from '../validation.regex.patterns'

export const ssnValidator = (name: string, required: boolean = true) => {
    const constraints: IValidationConstraintBuilder<any>[] = []

    if (required) {
        constraints.push(
            new ValidationConstraintBuilder<boolean>('required')
                .setConstraint(true)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.ssnError)
                .setGuideMessage(ValidationLocalizeKeys.ssnGuide)
        )
    }

    // SSN pattern validation
    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(ssnPattern)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.ssnError)
            .setGuideMessage(ValidationLocalizeKeys.ssnGuide)
    )

    // Length validation for SSN
    constraints.push(
        new ValidationConstraintBuilder<number>('minLength')
            .setConstraint(9)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.ssnError)
            .setGuideMessage(ValidationLocalizeKeys.ssnGuide)
    )

    constraints.push(
        new ValidationConstraintBuilder<number>('maxLength')
            .setConstraint(11)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.ssnError)
            .setGuideMessage(ValidationLocalizeKeys.ssnGuide)
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}
